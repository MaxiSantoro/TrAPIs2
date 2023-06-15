import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Configuración de Swagger
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'API de TrAPIs',
      description: 'Documentación de la API de TrAPIs',
      version: '1.0.0',
    },
  },
  apis: ['./server.js'], // Ruta al archivo principal de tu aplicación
};

// Generar el objeto de especificación de Swagger
const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Configuración de la ruta para visualizar la documentación de Swagger
export default function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

