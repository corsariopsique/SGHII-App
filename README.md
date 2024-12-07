# SGHII-App

El **Sistema de Gestión de Herramienta Ingeniar Inoxidables (SGHII)** es una aplicación diseñada para facilitar la gestión de inventarios de herramientas en entornos industriales. Este repositorio contiene el código del frontend desarrollado con **React.js**, que proporciona una interfaz de usuario intuitiva y moderna.

## Descripción general

El frontend del SGHII se encarga de:
- Mostrar el estado y los detalles del inventario de herramientas.
- Proporcionar gráficos interactivos para estadísticas de uso y disponibilidad.
- Ofrecer una barra de búsqueda para localizar herramientas rápidamente.
- Conectar con el backend a través de una API REST para obtener y enviar datos.

## Tecnologías utilizadas

- **React.js**: Framework para construir la interfaz de usuario.
- **React Router**: Framework de enrrutamiento de componentes para la interfaz de usuario
- **Chart.js**: Para la representación gráfica de datos.
- **Bootstrap**: Se utiliza para estilizar componentes React mediante sus clases CSS predefinidas.
- **CSS3**: Estilización personalizada para mejorar la experiencia del usuario.

## Requisitos previos

Antes de desplegar el sistema, asegúrate de tener instalado:
- **Node.js** (v14 o superior)
- **npm** o **yarn**
- Un backend funcional del SGHII (ver el repositorio SGHII-WebService).
- Un backend funcional gestion de cuentas de usuario (ver el repositorio SGHIIusermanagement).

## Estructura del proyecto
```bash

SGHII-App/
├── data/                                 # Contiene el script SQL para inicializar la base de datos del SGHII
├── public/                               # Archivos públicos
├── src/
│   └── components/                       # Componentes reutilizables
|        ├── authentication/              # Componentes gestión autenticación
│        ├── generalUseComponents/        # Componentes de proposito general
│        ├── images/                      # Imagenes aux frontend
│        ├── Layouts/                     # Componentes plantillas para distintos propositos
│        └── pages/                       # Conjunto de modulos de la aplicación 
│            ├── Configuracion/           # Componentes modulo configuración
|            ├── Dashboard/               # Componentes modulo Panel Principal
|            ├── Inventario/              # Componentes modulo Inventario
|            ├── Kits/                    # Componentes modulo Kits
|            ├── Operaciones/             # Componentes modulo Operaciones
|            ├── Operario/                # Componentes modulo Operario
|            ├── Proveedores/             # Componentes modulo Proveedores
|            └── Reportes/                # Componentes modulo Reportes
│                    
│        ├── IndexComponents.js           # Indice de componentes reutilizables
│        └── Iconos/                      # Iconos SVGR    
│                    
│   ├── App.js                            # Configuración principal de la aplicación (Router)
│   ├── config.js                         # Configuración importacion variables de entorno
│   └── index.js                          # Punto de entrada
├── .env                                  # Variables de entorno con url de los servicios web
├── package.json                          # Dependencias y scripts
└── README.md                             # Documentación

```
## Instalación y configuración

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/corsariopsique/SGHII-App.git
   cd SGHII-App
2. **Crea variables de entorno**:
   ```bash
   REACT_APP_WEB_SERVICE_URL={url del servicio de gestion inventarios}
   REACT_APP_ACCOUNT_SERVICE_URL={url del servicio de gestion usuarios aplicacion}
3. **Instalar dependencias**:
   ```bash
   npm install
4. **Correr modo dev**:
   ```bash
   npm start
5. **Generación Build**:
   ```bash
   npm run build   
## Licencia

Este proyecto está licenciado bajo la **MIT License**. Consulta el archivo `LICENSE` para más detalles.

