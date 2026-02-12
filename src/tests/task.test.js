const request = require("supertest");
const app = require("../app");
const taskStore = require("../data/task_store");

beforeEach(() => {
  taskStore.clear();
});

describe("POST /tasks", () => {
  it("should create a new task", async () => {
    const res = await request(app)
      .post("/tasks")
      .send({ title: "Test task" });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.title).toBe("Test task");
    expect(res.body.completed).toBe(false);
    expect(res.body).toHaveProperty("createdAt");
  });

  it("should create a task with completed set to true", async () => {
    const res = await request(app)
      .post("/tasks")
      .send({ title: "Done task", completed: true });

    expect(res.status).toBe(201);
    expect(res.body.completed).toBe(true);
  });

  it("should return 400 if title is missing", async () => {
    const res = await request(app)
      .post("/tasks")
      .send({});

    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/title/i);
  });

  it("should return 400 if title is not a string", async () => {
    const res = await request(app)
      .post("/tasks")
      .send({ title: 123 });

    expect(res.status).toBe(400);
  });

  it("should return 400 if completed is not a boolean", async () => {
    const res = await request(app)
      .post("/tasks")
      .send({ title: "Task", completed: "yes" });

    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/completed/i);
  });
});

describe("GET /tasks", () => {
  it("should return an empty array when no tasks exist", async () => {
    const res = await request(app).get("/tasks");

    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it("should return all tasks", async () => {
    await request(app).post("/tasks").send({ title: "Task 1" });
    await request(app).post("/tasks").send({ title: "Task 2" });

    const res = await request(app).get("/tasks");

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
  });
});

describe("GET /tasks/:id", () => {
  it("should return a single task by id", async () => {
    const created = await request(app)
      .post("/tasks")
      .send({ title: "Find me" });

    const res = await request(app).get(`/tasks/${created.body.id}`);

    expect(res.status).toBe(200);
    expect(res.body.title).toBe("Find me");
  });

  it("should return 404 for non-existent id", async () => {
    const res = await request(app).get("/tasks/non-existent-id");

    expect(res.status).toBe(404);
    expect(res.body.message).toMatch(/not found/i);
  });
});

describe("PUT /tasks/:id", () => {
  it("should update a task title", async () => {
    const created = await request(app)
      .post("/tasks")
      .send({ title: "Old title" });

    const res = await request(app)
      .put(`/tasks/${created.body.id}`)
      .send({ title: "New title" });

    expect(res.status).toBe(200);
    expect(res.body.title).toBe("New title");
    expect(res.body).toHaveProperty("updatedAt");
  });

  it("should update completed status", async () => {
    const created = await request(app)
      .post("/tasks")
      .send({ title: "Toggle me" });

    const res = await request(app)
      .put(`/tasks/${created.body.id}`)
      .send({ completed: true });

    expect(res.status).toBe(200);
    expect(res.body.completed).toBe(true);
  });

  it("should return 404 for non-existent id", async () => {
    const res = await request(app)
      .put("/tasks/non-existent-id")
      .send({ title: "Nope" });

    expect(res.status).toBe(404);
  });

  it("should return 400 if title is not a string", async () => {
    const created = await request(app)
      .post("/tasks")
      .send({ title: "Valid" });

    const res = await request(app)
      .put(`/tasks/${created.body.id}`)
      .send({ title: 123 });

    expect(res.status).toBe(400);
  });
});

describe("DELETE /tasks/:id", () => {
  it("should delete a task", async () => {
    const created = await request(app)
      .post("/tasks")
      .send({ title: "Delete me" });

    const res = await request(app).delete(`/tasks/${created.body.id}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toMatch(/deleted/i);

    const getRes = await request(app).get(`/tasks/${created.body.id}`);
    expect(getRes.status).toBe(404);
  });

  it("should return 404 for non-existent id", async () => {
    const res = await request(app).delete("/tasks/non-existent-id");

    expect(res.status).toBe(404);
  });
});

describe("404 handler", () => {
  it("should return 404 for unknown routes", async () => {
    const res = await request(app).get("/unknown");

    expect(res.status).toBe(404);
    expect(res.body.message).toMatch(/not found/i);
  });
});
