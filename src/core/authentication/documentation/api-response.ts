export const API_RESPONSE = {
  "validate-email": {
      "type": "object",
      "properties": {
          "userExist": {
              "type": "boolean",
              "example": true
          },
          "credential": {
              "type": "string",
              "example": "ODQ4YWE1ZWQtMjNhMC00NmNjLTg0YjEtYWQ2YWRmM2RlNDYw"
          }
      }
  },
  "verification-code": {
      "type": "boolean",
      "example": false
  },
  "login": {
      "type": "object",
      "properties": {
          "user": {
              "type": "object",
              "properties": {
                  "id": {
                      "type": "string",
                      "example": "8cb647ec-cc77-490b-9b6e-1b4f3279a8a1"
                  },
                  "name": {
                      "type": "string",
                      "example": "Juan Pére32z"
                  },
                  "nickName": {
                      "type": "string",
                      "example": "jprez13323333"
                  },
                  "email": {
                      "type": "string",
                      "example": "juan.ere4513z@exa2mple.com"
                  }
              }
          },
          "token": {
              "type": "string",
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
          }
      }
  },
  "change-password": {
      "type": "boolean",
      "example": true
  }
};