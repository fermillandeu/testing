const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {

  test("GET /cafes debería devolver un status 200 y un arreglo con al menos un objeto", async () => {
    const response = await request(server).get("/cafes");
    expect(response.status).toBe(200); 
    expect(Array.isArray(response.body)).toBe(true); 
    expect(response.body.length).toBeGreaterThan(0); 
  });

  
  test("DELETE /cafes/:id debería devolver un código 404 si el id no existe", async () => {
    const idInexistente = 9999; 
    const response = await request(server).delete(`/cafes/${idInexistente}`).set("Authorization", "Bearer token");
    expect(response.status).toBe(404); 
    expect(response.body.message).toBe("No se encontró ningún cafe con ese id"); 
  });


  test("POST /cafes debería agregar un nuevo café y devolver un código 201", async () => {
    const nuevoCafe = { id: 4, nombre: "Capuchino" }; 
    const response = await request(server).post("/cafes").send(nuevoCafe);
    expect(response.status).toBe(201); 
    expect(response.body).toContainEqual(nuevoCafe); 
  });

  test("PUT /cafes/:id debería devolver un código 400 si el id no coincide", async () => {
    const id = 1; 
    const cafeConIdDiferente = { id: 2, nombre: "Latte" }; 
    const response = await request(server).put(`/cafes/${id}`).send(cafeConIdDiferente);
    expect(response.status).toBe(400); 
    expect(response.body.message).toBe("El id del parámetro no coincide con el id del café recibido"); 
  });
});
