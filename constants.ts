import { DocumentTemplate } from './types';

export const DOCUMENT_TEMPLATES: DocumentTemplate[] = [
  {
    id: 'contrato-alquiler',
    title: 'Contrato de Alquiler de Vivienda',
    description: 'Genere un contrato de alquiler estándar para propiedades residenciales.',
    fields: [
      { id: 'arrendadorNombre', label: 'Nombre Completo del Arrendador', type: 'text' },
      { id: 'arrendadorCedula', label: 'Cédula del Arrendador', type: 'text' },
      { id: 'arrendatarioNombre', label: 'Nombre Completo del Arrendatario', type: 'text' },
      { id: 'arrendatarioCedula', label: 'Cédula del Arrendatario', type: 'text' },
      { id: 'direccionInmueble', label: 'Dirección del Inmueble', type: 'text' },
      { id: 'montoAlquiler', label: 'Monto Mensual del Alquiler (RD$)', type: 'number' },
      { id: 'fechaInicio', label: 'Fecha de Inicio del Contrato', type: 'date' },
    ],
  },
  {
    id: 'acto-venta-vehiculo',
    title: 'Acto de Venta de Vehículo',
    description: 'Complete los datos para generar un acto de venta para un vehículo de motor.',
    fields: [
      { id: 'vendedorNombre', label: 'Nombre Completo del Vendedor', type: 'text' },
      { id: 'vendedorCedula', label: 'Cédula del Vendedor', type: 'text' },
      { id: 'compradorNombre', label: 'Nombre Completo del Comprador', type: 'text' },
      { id: 'compradorCedula', label: 'Cédula del Comprador', type: 'text' },
      { id: 'marcaVehiculo', label: 'Marca del Vehículo', type: 'text' },
      { id: 'modeloVehiculo', label: 'Modelo del Vehículo', type: 'text' },
      { id: 'chasisVehiculo', label: 'No. de Chasis', type: 'text' },
      { id: 'montoVenta', label: 'Monto de la Venta (RD$)', type: 'number' },
    ],
  },
  {
    id: 'pagare-notarial',
    title: 'Pagaré Notarial',
    description: 'Genere un pagaré notarial para formalizar una deuda.',
    fields: [
      { id: 'deudorNombre', label: 'Nombre Completo del Deudor', type: 'text' },
      { id: 'deudorCedula', label: 'Cédula del Deudor', type: 'text' },
      { id: 'acreedorNombre', label: 'Nombre Completo del Acreedor', type: 'text' },
      { id: 'acreedorCedula', label: 'Cédula del Acreedor', type: 'text' },
      { id: 'montoDeuda', label: 'Monto de la Deuda (RD$)', type: 'number' },
      { id: 'fechaVencimiento', label: 'Fecha de Vencimiento', type: 'date' },
    ],
  },
  {
    id: 'carta-poder',
    title: 'Carta de Poder',
    description: 'Genere una carta de poder para autorizar a otra persona a actuar en su nombre.',
    fields: [
      { id: 'poderdanteNombre', label: 'Nombre Completo del Poderdante', type: 'text' },
      { id: 'poderdanteCedula', label: 'Cédula del Poderdante', type: 'text' },
      { id: 'apoderadoNombre', label: 'Nombre Completo del Apoderado', type: 'text' },
      { id: 'apoderadoCedula', label: 'Cédula del Apoderado', type: 'text' },
      { id: 'descripcionPoderes', label: 'Descripción de los Poderes Otorgados (sea específico)', type: 'text' },
    ],
  },
  {
    id: 'declaracion-jurada-solteria',
    title: 'Declaración Jurada de Soltería',
    description: 'Crea una declaración jurada para certificar el estado civil de soltería, a menudo requerida para trámites matrimoniales o consulares.',
    fields: [
      { id: 'declaranteNombre', label: 'Nombre Completo del Declarante', type: 'text' },
      { id: 'declaranteCedula', label: 'Cédula del Declarante', type: 'text' },
      { id: 'declaranteDireccion', label: 'Dirección del Declarante', type: 'text' },
      { id: 'testigo1Nombre', label: 'Nombre Completo del Primer Testigo', type: 'text' },
      { id: 'testigo1Cedula', label: 'Cédula del Primer Testigo', type: 'text' },
      { id: 'testigo2Nombre', label: 'Nombre Completo del Segundo Testigo', type: 'text' },
      { id: 'testigo2Cedula', label: 'Cédula del Segundo Testigo', type: 'text' },
    ],
  },
];