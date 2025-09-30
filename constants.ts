import { DocumentTemplate } from './types';

export const DOCUMENT_TEMPLATES: DocumentTemplate[] = [
  {
    id: 'contrato-alquiler-residencial',
    title: 'Contrato de Alquiler Residencial',
    description: 'Acuerdo legal entre un propietario y un inquilino para el alquiler de una vivienda.',
    fields: [
      { id: 'landlordName', label: 'Nombre del Propietario', type: 'text' },
      { id: 'landlordId', label: 'Cédula del Propietario', type: 'text' },
      { id: 'tenantName', label: 'Nombre del Inquilino', type: 'text' },
      { id: 'tenantId', label: 'Cédula del Inquilino', type: 'text' },
      { id: 'propertyAddress', label: 'Dirección del Inmueble', type: 'text' },
      { id: 'rentAmount', label: 'Monto del Alquiler (RD$)', type: 'number' },
      { id: 'rentDueDate', label: 'Día de Pago del Alquiler', type: 'number' },
      { id: 'startDate', label: 'Fecha de Inicio del Contrato', type: 'date' },
      { id: 'endDate', label: 'Fecha de Fin del Contrato', type: 'date' },
      { id: 'depositAmount', label: 'Monto del Depósito (RD$)', type: 'number' },
    ],
    generateText: (data) => `
CONTRATO DE ALQUILER RESIDENCIAL

ENTRE:

DE UNA PARTE, ${data.landlordName || '[Nombre del Propietario]'}, dominicano(a), mayor de edad, portador(a) de la Cédula de Identidad y Electoral No. ${data.landlordId || '[Cédula del Propietario]'}, con domicilio en [Dirección del Propietario], quien en lo adelante se denominará EL PROPIETARIO;

Y DE LA OTRA PARTE, ${data.tenantName || '[Nombre del Inquilino]'}, dominicano(a), mayor de edad, portador(a) de la Cédula de Identidad y Electoral No. ${data.tenantId || '[Cédula del Inquilino]'}, con domicilio en [Dirección del Inquilino], quien para los fines y consecuencias del presente contrato se denominará EL INQUILINO.

HAN CONVENIDO Y PACTADO LO SIGUIENTE:

ARTÍCULO PRIMERO: OBJETO. EL PROPIETARIO, por medio del presente acto, da en alquiler a EL INQUILINO, quien acepta, el inmueble ubicado en la siguiente dirección: ${data.propertyAddress || '[Dirección del Inmueble]'}.

ARTÍCULO SEGUNDO: USO DEL INMUEBLE. EL INQUILINO se compromete a utilizar el inmueble alquilado exclusivamente para uso residencial familiar, no pudiendo dedicarlo a ningún otro uso, sea comercial, profesional o de cualquier otra índole.

ARTÍCULO TERCERO: PRECIO. El precio mensual del alquiler se fija en la suma de ${data.rentAmount || '[Monto del Alquiler]'} PESOS DOMINICANOS (RD$${data.rentAmount || '0.00'}). Dicho monto deberá ser pagado por EL INQUILINO el día ${data.rentDueDate || '[Día de Pago]'} de cada mes, sin necesidad de requerimiento alguno. La falta de pago en la fecha estipulada generará una penalidad de un cinco por ciento (5%) mensual sobre las sumas adeudadas, a título de cláusula penal.

ARTÍCULO CUARTO: DURACIÓN. El presente contrato tendrá una duración de un (1) año, a partir del día ${new Date(data.startDate || Date.now()).toLocaleDateString('es-DO')} y terminando de pleno derecho el día ${new Date(data.endDate || Date.now()).toLocaleDateString('es-DO')}. El contrato podrá ser renovado por mutuo acuerdo entre las partes, notificado por escrito con al menos treinta (30) días de antelación.

ARTÍCULO QUINTO: DEPÓSITO EN GARANTÍA. A la firma del presente contrato, EL INQUILINO entrega a EL PROPIETARIO la suma de ${data.depositAmount || '[Monto del Depósito]'} PESOS DOMINICANOS (RD$${data.depositAmount || '0.00'}), en calidad de depósito en garantía. Esta suma no será imputable al pago de alquileres vencidos y será devuelta a EL INQUILINO dentro de los cuarenta y cinco (45) días posteriores a la terminación del contrato, previa deducción de cualquier deuda por concepto de alquileres, servicios, reparaciones por daños imputables a EL INQUILINO o penalidades.

ARTÍCULO SEXTO: PROHIBICIONES. Queda terminantemente prohibido a EL INQUILINO: a) Subarrendar o ceder el inmueble, total o parcialmente. b) Realizar modificaciones estructurales, cambios de pintura o cualquier alteración al inmueble sin la autorización previa y por escrito de EL PROPIETARIO. c) Realizar actividades que atenten contra la moral, las buenas costumbres o el orden público.

ARTÍCULO SÉPTIMO: SERVICIOS PÚBLICOS. Todos los servicios públicos tales como energía eléctrica, agua, teléfono, internet, televisión por cable y gas serán por cuenta exclusiva de EL INQUILINO.

ARTÍCULO OCTAVO: MANTENIMIENTO Y REPARACIONES. EL INQUILINO declara recibir el inmueble en perfecto estado de habitabilidad. Las reparaciones mayores (estructurales, vicios ocultos) serán responsabilidad de EL PROPIETARIO. Las reparaciones menores y el mantenimiento locativo (plomería menor, electricidad, pintura, etc.) que se deban al uso y desgaste normal serán por cuenta de EL INQUILINO.

ARTÍCULO NOVENO: RESOLUCIÓN DE CONTRATO. El incumplimiento de cualquiera de las cláusulas del presente contrato por parte de EL INQUILINO dará derecho a EL PROPIETARIO a rescindirlo de pleno derecho.

ARTÍCULO DÉCIMO: JURISDICCIÓN. Para todo lo no previsto en este contrato, las partes se remiten al derecho común y atribuyen competencia exclusiva a los tribunales de la ciudad de [Ciudad], República Dominicana.

HECHO Y FIRMADO de buena fe, en dos (2) originales de un mismo tenor y efecto, en la ciudad de [Ciudad], República Dominicana, a la fecha de ${new Date().toLocaleDateString('es-DO')}.


_________________________
${data.landlordName || '[Nombre del Propietario]'}
EL PROPIETARIO


_________________________
${data.tenantName || '[Nombre del Inquilino]'}
EL INQUILINO
    `,
  },
  {
    id: 'acto-venta-vehiculo',
    title: 'Acto de Venta de Vehículo',
    description: 'Documento legal para formalizar la transferencia de propiedad de un vehículo motorizado.',
    fields: [
      { id: 'sellerName', label: 'Nombre del Vendedor', type: 'text' },
      { id: 'sellerId', label: 'Cédula del Vendedor', type: 'text' },
      { id: 'buyerName', label: 'Nombre del Comprador', type: 'text' },
      { id: 'buyerId', label: 'Cédula del Comprador', type: 'text' },
      { id: 'vehicleMake', label: 'Marca del Vehículo', type: 'text' },
      { id: 'vehicleModel', label: 'Modelo del Vehículo', type: 'text' },
      { id: 'vehicleYear', label: 'Año del Vehículo', type: 'number' },
      { id: 'vehicleVin', label: 'Chasis (VIN)', type: 'text' },
      { id: 'vehiclePlate', label: 'Placa', type: 'text' },
      { id: 'salePrice', label: 'Precio de Venta (RD$)', type: 'number' },
      { id: 'saleDate', label: 'Fecha de Venta', type: 'date' },
    ],
    generateText: (data) => `
ACTO DE VENTA DE VEHÍCULO DE MOTOR

ENTRE:

DE UNA PARTE, ${data.sellerName || '[Nombre del Vendedor]'}, dominicano(a), mayor de edad, portador(a) de la Cédula de Identidad y Electoral No. ${data.sellerId || '[Cédula del Vendedor]'}, domiciliado(a) y residente en [Dirección del Vendedor], quien en lo adelante se denominará LA PARTE VENDEDORA.

Y DE OTRA PARTE, ${data.buyerName || '[Nombre del Comprador]'}, dominicano(a), mayor de edad, portador(a) de la Cédula de Identidad y Electoral No. ${data.buyerId || '[Cédula del Comprador]'}, domiciliado(a) y residente en [Dirección del Comprador], quien en lo adelante se denominará LA PARTE COMPRADORA.

HAN CONVENIDO Y PACTADO LO SIGUIENTE:

PRIMERO: OBJETO. LA PARTE VENDEDORA, por medio del presente acto, VENDE, CEDE Y TRASPASA, libre de todo gravamen o inscripción, desde ahora y para siempre, con todas las garantías de derecho, a LA PARTE COMPRADORA, quien acepta, el vehículo de motor que se describe a continuación:
- Tipo: [Ej: Carro, Jeepeta]
- Marca: ${data.vehicleMake || '[Marca]'}
- Modelo: ${data.vehicleModel || '[Modelo]'}
- Año de Fabricación: ${data.vehicleYear || '[Año]'}
- Número de Chasis (VIN): ${data.vehicleVin || '[Chasis]'}
- Número de Placa: ${data.vehiclePlate || '[Placa]'}
- Color: [Color del Vehículo]
- Matrícula No.: [Número de Matrícula]

SEGUNDO: PRECIO. El precio de la presente venta ha sido fijado y convenido en la suma única de ${data.salePrice || '[Precio]'} PESOS DOMINICANOS (RD$${data.salePrice || '0.00'}), valor que LA PARTE VENDEDORA declara haber recibido en su totalidad a su entera satisfacción de manos de LA PARTE COMPRADORA, por lo que le otorga por este mismo documento formal recibo de descargo y finiquito legal.

TERCERO: ESTADO DEL VEHÍCULO. LA PARTE COMPRADORA declara haber inspeccionado el vehículo a su entera satisfacción y lo recibe en el estado en que se encuentra ("as is"), renunciando a cualquier reclamación posterior por vicios ocultos o aparentes.

CUARTO: DECLARACIÓN DE LA PARTE VENDEDORA. LA PARTE VENDEDORA declara y garantiza que el vehículo objeto de esta venta es de su exclusiva propiedad, que no posee deudas, multas de tránsito, oposiciones, ni ningún tipo de gravamen o impedimento legal que limite su derecho de propiedad o su libre disposición. Se compromete a entregar todos los documentos originales del vehículo.

QUINTO: RESPONSABILIDAD Y TRASPASO. A partir de la fecha de la firma del presente acto, LA PARTE COMPRADORA asume toda la responsabilidad civil, penal y administrativa que pueda derivarse del uso del vehículo. Asimismo, se compromete a realizar el trámite de traspaso de propiedad ante la Dirección General de Impuestos Internos (DGII) en un plazo no mayor a noventa (90) días, liberando a LA PARTE VENDEDORA de cualquier futura responsabilidad.

HECHO Y FIRMADO en la ciudad de [Ciudad], República Dominicana, el día ${new Date(data.saleDate || Date.now()).toLocaleDateString('es-DO')}.


_________________________
${data.sellerName || '[Nombre del Vendedor]'}
LA PARTE VENDEDORA


_________________________
${data.buyerName || '[Nombre del Comprador]'}
LA PARTE COMPRADORA
    `,
  },
  {
    id: 'pagare-notarial',
    title: 'Pagaré Notarial',
    description: 'Documento en el que una persona se compromete a pagar a otra una suma de dinero en una fecha determinada.',
    fields: [
      { id: 'debtorName', label: 'Nombre del Deudor', type: 'text' },
      { id: 'debtorId', label: 'Cédula del Deudor', type: 'text' },
      { id: 'creditorName', label: 'Nombre del Acreedor', type: 'text' },
      { id: 'creditorId', label: 'Cédula del Acreedor', type: 'text' },
      { id: 'amount', label: 'Monto del Préstamo (RD$)', type: 'number' },
      { id: 'dueDate', label: 'Fecha de Vencimiento del Pago', type: 'date' },
      { id: 'interestRate', label: 'Tasa de Interés por Mora (%)', type: 'number' },
      { id: 'city', label: 'Ciudad de Emisión', type: 'text' },
    ],
    generateText: (data) => `
PAGARÉ NOTARIAL
(ACTO BAJO FIRMA PRIVADA)

MONTO: RD$ ${data.amount || '0.00'}

Yo, ${data.debtorName || '[Nombre del Deudor]'}, dominicano(a), mayor de edad, de estado civil [Estado Civil], portador(a) de la Cédula de Identidad y Electoral No. ${data.debtorId || '[Cédula del Deudor]'}, domiciliado(a) y residente en [Dirección del Deudor], por medio del presente acto, confieso formalmente DEBER Y PAGARÉ, sin protesto, gastos ni requerimiento alguno, a la orden de ${data.creditorName || '[Nombre del Acreedor]'}, dominicano(a), mayor de edad, de estado civil [Estado Civil], portador(a) de la Cédula de Identidad y Electoral No. ${data.creditorId || '[Cédula del Acreedor]'}, domiciliado(a) y residente en [Dirección del Acreedor], o a su orden, la suma total de ${data.amount || '[Monto]'} PESOS DOMINICANOS (RD$${data.amount || '0.00'}).

Dicha suma será pagadera en su totalidad en la siguiente fecha de vencimiento: ${new Date(data.dueDate || Date.now()).toLocaleDateString('es-DO')}.

CLÁUSULA DE INTERÉS POR MORA: Se conviene y se pacta que, en caso de no efectuarse el pago en la fecha de vencimiento estipulada, la suma adeudada generará un interés por mora a razón de un ${data.interestRate || '0'} por ciento (${data.interestRate || '0'}%) mensual, calculado sobre el saldo insoluto, sin que esta cláusula implique una prórroga del plazo.

CLÁUSULA DE ACELERACIÓN: La falta de pago en la fecha de vencimiento hará que la totalidad de la deuda, incluyendo capital e intereses acumulados, se considere de plazo vencido y sea inmediatamente exigible y ejecutable, sin necesidad de intervención judicial.

Este pagaré se considera un título ejecutorio y da derecho al acreedor a perseguir el cobro por todas las vías legales. Para el fiel cumplimiento de las obligaciones contenidas en el presente pagaré, hago elección de domicilio en mi residencia indicada anteriormente.

Hecho y firmado de buena fe en la ciudad de ${data.city || '[Ciudad]'}, República Dominicana, a los ${new Date().toLocaleDateString('es-DO', { day: 'numeric' })} días del mes de ${new Date().toLocaleDateString('es-DO', { month: 'long' })} del año ${new Date().getFullYear()}.


_________________________
${data.debtorName || '[Nombre del Deudor]'}
DEUDOR(A)

Yo, [Nombre del Notario], Notario Público de los del Número para [Jurisdicción], con estudio profesional abierto en [Dirección del Notario], Matrícula No. [Matrícula], CERTIFICO Y DOY FE que la firma que antecede fue puesta en mi presencia, de manera libre y voluntaria, por el/la señor(a) ${data.debtorName}, de generales que constan en este mismo acto, quien me ha declarado que esa es la firma que acostumbra a utilizar en todos sus actos públicos y privados. En la ciudad de ${data.city || '[Ciudad]'}, a la fecha de su emisión.
    `,
  },
  {
    id: 'carta-poder',
    title: 'Carta de Poder',
    description: 'Documento para autorizar a una persona a actuar en nombre de otra para gestiones específicas.',
    fields: [
      { id: 'poderdanteName', label: 'Nombre de Quien Otorga el Poder (Poderdante)', type: 'text' },
      { id: 'poderdanteId', label: 'Cédula del Poderdante', type: 'text' },
      { id: 'apoderadoName', label: 'Nombre de Quien Recibe el Poder (Apoderado)', type: 'text' },
      { id: 'apoderadoId', label: 'Cédula del Apoderado', type: 'text' },
      { id: 'powers', label: 'Facultades Otorgadas (Describa aquí)', type: 'text' },
      { id: 'city', label: 'Ciudad', type: 'text' },
      { id: 'date', label: 'Fecha', type: 'date' },
    ],
    generateText: (data) => `
PODER ESPECIAL

Yo, ${data.poderdanteName || '[Nombre del Poderdante]'}, dominicano(a), mayor de edad, portador(a) de la Cédula de Identidad y Electoral No. ${data.poderdanteId || '[Cédula del Poderdante]'}, domiciliado(a) y residente en [Dirección del Poderdante], por medio del presente documento, OTORGO PODER ESPECIAL, tan amplio y bastante como en derecho fuere necesario, pero limitado a los fines que se detallan a continuación, a favor de ${data.apoderadoName || '[Nombre del Apoderado]'}, dominicano(a), mayor de edad, portador(a) de la Cédula de Identidad y Electoral No. ${data.apoderadoId || '[Cédula del Apoderado]'}, domiciliado(a) y residente en [Dirección del Apoderado], para que en mi nombre y representación, pueda realizar las siguientes diligencias y gestiones:

FACULTADES:
${data.powers || '[Describa aquí de forma detallada y específica las facultades otorgadas. Por ejemplo: "Retirar cheques, realizar depósitos y solicitar estados de cuenta en mi cuenta de ahorros No. XXXX del Banco YYYY.", o "Firmar en mi nombre el contrato de alquiler del inmueble ubicado en la dirección ZZZZ."].'}

En consecuencia, mi apoderado(a) queda facultado(a) para firmar todo tipo de documentos, públicos o privados, presentar solicitudes, retirar documentos, hacer declaraciones y, en general, realizar cuantos actos y gestiones sean necesarios para el cabal y fiel cumplimiento de este mandato, declarando desde ahora válido y aceptado todo lo que en virtud de este poder se hiciere.

Este poder se mantendrá vigente hasta el cumplimiento de su objeto o hasta que sea revocado expresamente por mí mediante un acto posterior.

Hecho y firmado en la ciudad de ${data.city || '[Ciudad]'}, República Dominicana, a los ${new Date(data.date || Date.now()).toLocaleDateString('es-DO', { day: 'numeric' })} días del mes de ${new Date(data.date || Date.now()).toLocaleDateString('es-DO', { month: 'long' })} del año ${new Date(data.date || Date.now()).getFullYear()}.


_________________________
${data.poderdanteName || '[Nombre del Poderdante]'}
PODERDANTE

Yo, [Nombre del Notario], Notario Público de los del Número para [Jurisdicción], CERTIFICO Y DOY FE que la firma que antecede fue puesta en mi presencia por el/la poderdante, de generales que constan, quien me ha declarado que esa es la firma que utiliza en todos sus actos.
    `,
  },
  {
    id: 'declaracion-jurada-solteria',
    title: 'Declaración Jurada de Soltería',
    description: 'Documento legal donde una persona declara bajo juramento que no está casada, con el respaldo de testigos.',
    fields: [
      { id: 'fullName', label: 'Nombre Completo del Declarante', type: 'text' },
      { id: 'idNumber', label: 'Cédula del Declarante', type: 'text' },
      { id: 'address', label: 'Dirección del Declarante', type: 'text' },
      { id: 'witness1Name', label: 'Nombre del Testigo 1', type: 'text' },
      { id: 'witness1Id', label: 'Cédula del Testigo 1', type: 'text' },
      { id: 'witness2Name', label: 'Nombre del Testigo 2', type: 'text' },
      { id: 'witness2Id', label: 'Cédula del Testigo 2', type: 'text' },
      { id: 'city', label: 'Ciudad', type: 'text' },
      { id: 'date', label: 'Fecha del Documento', type: 'date' },
    ],
    generateText: (data) => `
ACTO AUTÉNTICO DE DECLARACIÓN JURADA DE ESTADO CIVIL (SOLTERÍA)

En la ciudad de ${data.city || '[Ciudad]'}, República Dominicana, a los ${new Date(data.date || Date.now()).toLocaleDateString('es-DO', { day: 'numeric' })} días del mes de ${new Date(data.date || Date.now()).toLocaleDateString('es-DO', { month: 'long' })} del año ${new Date(data.date || Date.now()).getFullYear()}.

Por ante mí, DOCTOR(A) [Nombre Completo del Notario], Abogado Notario Público de los del Número para la jurisdicción de [Jurisdicción], con estudio profesional abierto en [Dirección del Notario], titular de la Matrícula No. [Matrícula del Notario] del Colegio Dominicano de Notarios.

HAN COMPARECIDO de manera personal, libre y voluntaria, por una parte, el/la señor(a) ${data.fullName || '[Nombre Completo del Declarante]'}, dominicano(a), mayor de edad, portador(a) de la Cédula de Identidad y Electoral No. ${data.idNumber || '[Cédula del Declarante]'}, domiciliado(a) y residente en ${data.address || '[Dirección del Declarante]'}, quien en lo adelante se denominará EL/LA DECLARANTE.

Y como TESTIGOS instrumentales requeridos al efecto, libres de tacha y excepción, los señores:
1. ${data.witness1Name || '[Nombre del Testigo 1]'}, dominicano(a), mayor de edad, portador(a) de la Cédula de Identidad y Electoral No. ${data.witness1Id || '[Cédula del Testigo 1]'}, domiciliado y residente en [Dirección del Testigo 1].
2. ${data.witness2Name || '[Nombre del Testigo 2]'}, dominicano(a), mayor de edad, portador(a) de la Cédula de Identidad y Electoral No. ${data.witness2Id || '[Cédula del Testigo 2]'}, domiciliado y residente en [Dirección del Testigo 2].

Y previo juramento de decir la verdad, los comparecientes ME HAN DECLARADO lo siguiente:

PRIMERO: EL/LA DECLARANTE declara bajo la fe del juramento que su estado civil actual es el de SOLTERO(A), y que, en consecuencia, no tiene ningún vínculo matrimonial legalmente constituido ni vigente, ni en la República Dominicana ni en ningún otro país, lo que le habilita para contraer matrimonio.

SEGUNDO: LOS TESTIGOS, señores ${data.witness1Name} y ${data.witness2Name}, declaran de manera conjunta y separada, bajo la fe del juramento, que conocen de vista, trato y comunicación desde hace muchos años a EL/LA DECLARANTE, y que por ese conocimiento personal les consta de manera indubitable que su estado civil es el de SOLTERO(A).

TERCERO: La presente declaración se hace con el fin de ser utilizada para [Indicar propósito, ej: contraer matrimonio con (Nombre de la pareja), trámites consulares, etc.], y para todos los fines legales que sean necesarios.

Leído el presente acto a los comparecientes, en alta y clara voz, estos lo han encontrado conforme a sus declaraciones, por lo que proceden a firmarlo junto conmigo y ante mí, Notario Público infrascrito, que CERTIFICO Y DOY FE de todo lo anterior.


_________________________
${data.fullName || '[Nombre del Declarante]'}
DECLARANTE


_________________________
${data.witness1Name || '[Nombre Testigo 1]'}
TESTIGO 1


_________________________
${data.witness2Name || '[Nombre Testigo 2]'}
TESTIGO 2


_________________________
[Nombre del Notario]
NOTARIO PÚBLICO
    `,
  },
];
