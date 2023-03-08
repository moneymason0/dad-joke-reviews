FROM node:latest
WORKDIR /app

RUN npm install -g nodemon  
# Bundle app source and copy the files to the image
COPY . .
# Expose the post so programs outside Docker 
# (Browser, Postman, etc) can access the server port 8000 
EXPOSE 8000
# When the image is finally run in a container, execute this:
CMD [ "nodemon", "express.js"]