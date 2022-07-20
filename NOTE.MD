# create t3-app configuration

? Will you be using JavaScript or TypeScript? TypeScript
Good choice! Using TypeScript!
? Which packages would you like to enable? nextAuth, prisma, tailwind, trpc
? Initialize a new git repository? No
Sounds good! You can come back and run git init later.
? Would you like us to run yarn install? Yes

# added required package
yarn add ws nanoid node-fetch@2.6.1

yarn add @types/ws npm-run-all @types/cookie @types/node-fetch@2.5.11 ts-node-dev dotenv -D

# notes after t3-app creation
Next steps:
  cd .
  yarn prisma db push
  yarn dev

# prepare db migration

yarn prisma migrate dev --name init

# create a new migration

prisma migrate dev --name added_job_title

# In a development environment, use the migrate dev command to generate and apply migrations:

npx prisma migrate dev

