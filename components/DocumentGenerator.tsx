import React, { useState, useRef } from 'react';
import { Packer, Document, Paragraph, TextRun } from 'docx';
import saveAs from 'file-saver';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import { DOCUMENT_TEMPLATES } from '../constants';
import { DocumentTemplate } from '../types';
import { DocumentIcon, DownloadIcon } from './Icon';

const DocumentGenerator: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<DocumentTemplate | null>(null);
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [generatedDoc, setGeneratedDoc] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const previewRef = useRef<HTMLPreElement>(null);

  const handleSelectTemplate = (template: DocumentTemplate) => {
    setSelectedTemplate(template);
    setFormData({});
    setGeneratedDoc('');
  };
  
  const handleInputChange = (fieldId: string, value: string) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
  };

  const generateDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTemplate) return;
    const docText = selectedTemplate.generateText(formData);
    setGeneratedDoc(docText);
  };

  const handleDownloadDoc = async () => {
    if (!generatedDoc || !selectedTemplate) return;
    setIsGenerating(true);

    try {
        const doc = new Document({
            sections: [{
                children: generatedDoc.split('\n').map(
                    (text) => new Paragraph({ children: [new TextRun(text)] })
                ),
            }],
        });

        const blob = await Packer.toBlob(doc);
        saveAs(blob, `${selectedTemplate.id}.docx`);
    } catch (error) {
        console.error("Error generating DOCX:", error);
        alert("Hubo un error al generar el documento Word.");
    } finally {
        setIsGenerating(false);
    }
  };

  const handleDownloadPdf = async () => {
    if (!previewRef.current || !selectedTemplate) return;
    setIsGenerating(true);

    try {
        const canvas = await html2canvas(previewRef.current, {
            scale: 2,
            backgroundColor: document.documentElement.classList.contains('dark') ? '#1e293b' : '#f1f5f9',
            useCORS: true,
        });
        
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const ratio = canvasWidth / canvasHeight;
        
        const imgWidth = pdfWidth - 20; // 10mm margin on each side
        let imgHeight = imgWidth / ratio;
        let heightLeft = imgHeight;
        let position = 10; // 10mm margin top

        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= (pdfHeight - 20);

        while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
            heightLeft -= (pdfHeight - 20);
        }
        
        pdf.save(`${selectedTemplate.id}.pdf`);
    } catch (error) {
        console.error("Error generating PDF:", error);
        alert("Hubo un error al generar el PDF.");
    } finally {
        setIsGenerating(false);
    }
  };


  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl max-w-5xl mx-auto p-8 transition-colors duration-300">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-slate-100 mb-2">Generador de Documentos Básicos</h2>
      <p className="text-gray-600 dark:text-slate-400 mb-6">Seleccione una plantilla y complete el formulario para generar un documento.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {DOCUMENT_TEMPLATES.map(template => (
          <button
            key={template.id}
            onClick={() => handleSelectTemplate(template)}
            className={`p-6 border-2 rounded-lg text-left transition-all duration-200 ${selectedTemplate?.id === template.id ? 'border-blue-500 bg-blue-50 dark:bg-slate-700/[.5] shadow-lg' : 'border-gray-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md'}`}
          >
            <DocumentIcon className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-3" />
            <h3 className="font-semibold text-lg text-gray-800 dark:text-slate-200">{template.title}</h3>
            <p className="text-sm text-gray-600 dark:text-slate-400">{template.description}</p>
          </button>
        ))}
      </div>
      
      {selectedTemplate && (
        <div className="border-t border-slate-200 dark:border-slate-700 pt-8">
            <h3 className="text-xl font-bold mb-4 dark:text-slate-100">{selectedTemplate.title}</h3>
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-md mb-6 dark:bg-yellow-900/[.4] dark:border-yellow-600 dark:text-yellow-300">
                <p className="font-bold">Advertencia de Uso</p>
                <p className="text-sm">Esta es una plantilla estándar. Debe ser revisada por un profesional del derecho para asegurar que se ajusta a sus necesidades específicas.</p>
            </div>
            <form onSubmit={generateDocument} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {selectedTemplate.fields.map(field => (
                        <div key={field.id}>
                            <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 dark:text-slate-300">{field.label}</label>
                            <input
                                type={field.type}
                                id={field.id}
                                value={formData[field.id] || ''}
                                onChange={e => handleInputChange(field.id, e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:text-slate-200"
                                required
                            />
                        </div>
                    ))}
                </div>
                 <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition-colors">
                    Generar Documento
                </button>
            </form>
            
            {generatedDoc && (
                <div className="mt-8">
                    <h4 className="text-lg font-semibold mb-4 dark:text-slate-100">Vista Previa del Documento</h4>
                    <pre ref={previewRef} className="bg-slate-100 dark:bg-slate-900/[.5] p-6 rounded-md text-sm text-gray-800 dark:text-slate-300 whitespace-pre-wrap font-sans leading-relaxed">{generatedDoc}</pre>
                    <div className="mt-6 flex flex-col sm:flex-row gap-4">
                        <button 
                            onClick={handleDownloadDoc} 
                            disabled={isGenerating}
                            className="flex items-center justify-center gap-2 w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-wait transition-colors"
                        >
                           <DownloadIcon className="h-5 w-5" />
                            Descargar DOC
                        </button>
                         <button 
                            onClick={handleDownloadPdf} 
                            disabled={isGenerating}
                            className="flex items-center justify-center gap-2 w-full sm:w-auto bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 disabled:bg-red-400 disabled:cursor-wait transition-colors"
                        >
                            <DownloadIcon className="h-5 w-5" />
                            Descargar PDF
                        </button>
                    </div>
                </div>
            )}
        </div>
      )}
    </div>
  );
};

export default DocumentGenerator;