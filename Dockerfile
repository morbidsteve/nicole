# Use official nginx alpine image for smaller size
FROM nginx:alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/

# Copy website files to nginx html directory
COPY index.html /usr/share/nginx/html/
COPY intake.html /usr/share/nginx/html/
COPY contracts.html /usr/share/nginx/html/
COPY styles.css /usr/share/nginx/html/
COPY intake-styles.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/
COPY intake.js /usr/share/nginx/html/
COPY contracts/ /usr/share/nginx/html/contracts/

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
