# BodegaPass

Plataforma full stack de turismo enológico en Mendoza. Permite descubrir bodegas, restaurantes y experiencias, filtrarlas por zona y tags, ver la ficha de cada lugar y solicitar una reserva, y generar itinerarios de viaje personalizados con IA según los días de estadía, la zona y el presupuesto.

Portfolio: [github.com/ELAPAZCOSSETTI/PortfolioWeb](https://github.com/ELAPAZCOSSETTI/PortfolioWeb)

![Home](https://raw.githubusercontent.com/ELAPAZCOSSETTI/PortfolioWeb/main/public/projects/bodegapass-home.jpg)
![Buscador](https://raw.githubusercontent.com/ELAPAZCOSSETTI/PortfolioWeb/main/public/projects/bodegapass-buscar.jpg)

## Features

- Buscador de bodegas, restaurantes y experiencias con filtros por zona, precio y tags (pet-friendly, vistas a la cordillera, cata premium, etc.)
- Ficha de detalle por lugar: galería, varietales, duración de la visita y formulario de reserva
- Generador de itinerarios con IA: arma un plan día por día según cantidad de días, zona y presupuesto
- Panel de administración de reservas

## Stack

- [Next.js](https://nextjs.org) (App Router)
- PostgreSQL + [Knex](https://knexjs.org) (migraciones y seeds)
- IA conversacional (SDK compatible con OpenAI)
- Tailwind CSS

## Desarrollo local

Requiere Docker para levantar la base de datos local.

```bash
docker compose up -d
npm install
npx knex migrate:latest
npx knex seed:run
npm run dev
```

Variables de entorno necesarias en `.env.local`: `DATABASE_URL`, `AI_MODEL`.
