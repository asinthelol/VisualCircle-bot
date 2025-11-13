# VisualCircle Bot – Discord Image-Saving Bot

## Quick Start

1. Clone the repo

```bash
git clone https://github.com/asinthelol/VisualCircle-bot.git
cd VisualCircle-bot
```

2. Set up your environment

Create a `.env` file with your Discord bot credentials and database connection:
  - May need to change from sqlserver in `./prisma/schema.prisma`

```env
TOKEN=your_discord_bot_token
BOT_ID=your_bot_id
GUILD_ID=your_server_id
DATABASE_URL=sqlserver://localhost:1433;database=VisualCircle;user=sa;password=YourPassword;trustServerCertificate=true;encrypt=true
```

3. Install dependencies

```bash
npm install
```

This will automatically generate the Prisma client.

4. Set up the database

```bash
npx prisma db push
```

5. Deploy slash commands

```bash
npm run commands
```

6. Run the bot

```bash
npm run dev
```

## Features

- Slash command support
- Image saving and retrieval
- Reminder system
- SQL Server database integration
- TypeScript with hot reload

## Docker Deployment

Build the image:

```bash
docker build -t visualcircle-bot .
```

Run with environment variables:

```bash
docker run -d --env-file .env --name visualcircle-bot visualcircle-bot:latest
```

## Built With

- Discord.js v14
- TypeScript
- Prisma (SQL Server)
- Node.js
- Docker

## License

I don't care what you do with it, just don't say you made this.