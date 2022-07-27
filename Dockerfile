FROM node:16

# ADD package.json /app/

# # Create app directory
# WORKDIR /app
# # Install app dependencies
# # A wildcard is used to ensure both package.json AND package-lock.json are copied
# # where available (npm@5+)
# COPY package*.json ./

# RUN npm ci --only=production
# # RUN npm install
# # If you are building your code for production
# # RUN npm ci --only=production
# # Bundle app source
# ADD . /app
# COPY . .
# # RUN npm run seed:run
# ENV PORT 3000
# EXPOSE 8080
# CMD [ "npm", "run", "start" ]


# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

RUN npm run build
RUN npm run seed:run

ENV PORT 3000
EXPOSE 3000

CMD [ "nest", "start" ]