# Use nginx to serve the static files
FROM nginx:alpine

# Copy the built application to nginx html directory
COPY dist/ /usr/share/nginx/html/

# Copy custom nginx configuration if needed
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]