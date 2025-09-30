import React, { useState } from 'react';
import { DOCUMENT_TEMPLATES } from '../constants';
import { DocumentTemplate } from '../types';
import { DocumentIcon, PdfIcon } from './Icon';
import { generateLegalDocument } from '../services/geminiService';

const DocumentGenerator: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<DocumentTemplate | null>(null);
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [generatedDoc, setGeneratedDoc] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSelectTemplate = (template: DocumentTemplate) => {
    setSelectedTemplate(template);
    setFormData({});
    setGeneratedDoc('');
    setError('');
  };
  
  const handleInputChange = (fieldId: string, value: string) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
  };

  const generateDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTemplate || isGenerating) return;

    setIsGenerating(true);
    setGeneratedDoc('');
    setError('');

    const fieldLabels = selectedTemplate.fields.reduce((acc, field) => {
        acc[field.id] = field.label;
        return acc;
    }, {} as {[key: string]: string});
    
    const promptData = Object.keys(formData).reduce((acc, key) => {
        const label = fieldLabels[key] || key;
        acc[label] = formData[key];
        return acc;
    }, {} as {[key: string]: string});

    try {
        const docText = await generateLegalDocument(selectedTemplate.title, promptData);
        
        const isError = docText.startsWith('Error:') || docText.startsWith('La IA no pudo');

        if (isError) {
          setError(docText);
          setGeneratedDoc('');
        } else {
          setGeneratedDoc(docText);
          setError('');
        }
    } catch (err) {
        setError('Ocurrió un error inesperado al generar el documento. Por favor, intente de nuevo.');
        setGeneratedDoc('');
    } finally {
        setIsGenerating(false);
    }
  };

  const handlePrintPdf = () => {
    if (!generatedDoc || !selectedTemplate) return;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      const htmlContent = `
        <html>
          <head>
            <title>${selectedTemplate.title}</title>
            <style>
              body { font-family: 'Times New Roman', serif; font-size: 12pt; line-height: 1.5; margin: 1in; }
              p { margin-bottom: 1em; text-align: justify; }
            </style>
          </head>
          <body>
            ${generatedDoc.split('\n').map(p => `<p>${p || '&nbsp;'}</p>`).join('')}
          </body>
        </html>`;
      printWindow.document.open();
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 250);
    } else {
      setError('No se pudo abrir la ventana de impresión. Por favor, revise la configuración de su navegador para permitir ventanas emergentes.');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-5xl mx-auto p-8">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Generador de Documentos Básicos</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8">Seleccione una plantilla y complete el formulario para generar un documento.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {DOCUMENT_TEMPLATES.map(template => (
          <button
            key={template.id}
            onClick={() => handleSelectTemplate(template)}
            className={`p-6 border-2 rounded-lg text-left transition-all duration-200 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${selectedTemplate?.id === template.id ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/40 shadow-lg' : 'border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-md'}`}
          >
            <DocumentIcon className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-3" />
            <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">{template.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{template.description}</p>
          </button>
        ))}
      </div>
      
      {selectedTemplate && (
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">{selectedTemplate.title}</h3>
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 dark:bg-yellow-900/30 dark:border-yellow-600 dark:text-yellow-200 p-4 rounded-md mb-6">
                <p className="font-bold">Advertencia de Uso</p>
                <p className="text-sm">Esta es una plantilla estándar. El documento generado debe ser revisado por un profesional del derecho para asegurar que se ajusta a sus necesidades específicas.</p>
            </div>
            <form onSubmit={generateDocument} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {selectedTemplate.fields.map(field => (
                        <div key={field.id}>
                            <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 dark:text-gray-300">{field.label}</label>
                            <input
                                type={field.type}
                                id={field.id}
                                value={formData[field.id] || ''}
                                onChange={e => handleInputChange(field.id, e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 sm:text-sm dark:text-white"
                                required
                            />
                        </div>
                    ))}
                </div>
                 <button type="submit" disabled={isGenerating} className="inline-flex items-center bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 dark:disabled:bg-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    {isGenerating ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Generando...
                        </>
                    ) : (
                        'Generar Documento'
                    )}
                </button>
            </form>
            
            {error && <div className="mt-4 text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-500 p-3 rounded-md">{error}</div>}

            {generatedDoc && (
                <div className="mt-8">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-lg font-semibold text-gray-800 dark:text-white">Vista Previa del Documento</h4>
                      <div className="flex items-center space-x-4">
                        <button onClick={handlePrintPdf} className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
                            <PdfIcon className="h-5 w-5 mr-1.5" />
                            Guardar/Imprimir (.pdf)
                        </button>
                      </div>
                    </div>
                    <pre className="bg-gray-100 dark:bg-gray-900/70 p-4 rounded-md text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap font-sans border border-gray-200 dark:border-gray-700">{generatedDoc}</pre>
                </div>
            )}
        </div>
      )}
    </div>
  );
};

export default DocumentGenerator;