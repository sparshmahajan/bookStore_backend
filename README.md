# REST API server for SocialMedia-Backend

## ENV Vars

```env
MONGODB_URL=Your_Mongo_Database_URL
APP_SECRET=token_encryption_secret_for_jwt
CLOUDINARY_CLOUD_NAME=cloudinary_cloud_name
CLOUDINARY_API_KEY=cloudinary_api_key
CLOUDINARY_API_SECRET=cloudinary_api_secret
```

```
## important : "/api" is used with every path before the URLs given

## API DOCS

### USER ROUTES
    
 ``` 
 ---

| Description            |        URL      | Method |         Body         |   Status    |
| ---------------------- | --------------- | ------ | -------------------- | ----------- |
|        Sign Up         |   /user/signup  | POST   |      SignUp body     | CREATED     |
|        LogIn           |   /user/login   | POST   | user_name, password  | OK          |

---


```json
SignUp Body = {
    "name": "your_name",
    "email": "your_email",
    "password": "your_password",
}
```

---
### Posts Routes
|          Description          |          URL         | Method |      Body        |   Status    |
| ----------------------------- | -------------------  | ------ | ---------------- | ----------- |
|        Create book            |   /book/             | POST   |    Post body     | CREATED     |
|        Get all books          |   /book/             | GET    |                  | OK          |
|        Get book by id         |   /book/:id          | GET    |                  | OK          |
|        Update book            |   /book/:id          | PUT    |    Post body     | OK          |
|        Delete book            |   /book/:id          | DELETE |                  | OK          |
| Get all books with pagination | /book/paginate/:page | GET    |                  | OK          |
---


```json
Post Object = {
    "title": "book_title",
    "image": "book_image",
    "author": "book_author",
    "pages": "book_pages",
    "price": "book_price",
}
```


