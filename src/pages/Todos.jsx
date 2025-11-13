import { Form, Table, Badge, Button, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { fetchTodos } from "../data/todos";

const Todos = () => {
  const [todosRaw, setTodosRaw] = useState([]);
  const [todos, setTodos] = useState([]);
  const [onlyWaiting, setOnlyWaiting] = useState(false);
  const [itemPerPage, setItemPerpage] = useState(10);
  const [numPages, setNumPages] = useState(1);
  const [curPage, setCurPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  // Load initial data (supports sync or promise)
  useEffect(() => {
    (async () => {
      const data = await Promise.resolve(fetchTodos());
      setTodosRaw(Array.isArray(data) ? data : []);
      setCurPage(1);
    })();
  }, []);

  // Recalculate filtered list, pagination and current page when deps change
  useEffect(() => {
    const filtered = onlyWaiting
      ? todosRaw.filter((t) => !t.completed)
      : todosRaw;

    const calculatedNumPages = Math.max(1, Math.ceil(filtered.length / itemPerPage));
    // ensure current page inside bounds
    const newCurPage = Math.min(Math.max(1, curPage), calculatedNumPages);

    const start = (newCurPage - 1) * itemPerPage;
    const end = start + Number(itemPerPage);

    setTodos(filtered.slice(start, end));
    setNumPages(calculatedNumPages);
    if (newCurPage !== curPage) setCurPage(newCurPage);
  }, [todosRaw, onlyWaiting, itemPerPage, curPage]);

  // Delete todo (update raw source)
  const deleteTodo = (id) => {
    const updated = todosRaw.filter((t) => t.id !== id);
    setTodosRaw(updated);
    // after deletion, curPage may be out of range -> effect will correct it
  };

  // Toggle completed status (toggle so user can undo)
  const toggleCompleted = (id) => {
    const updated = todosRaw.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTodosRaw(updated);
  };

  // Add new todo
  const addTodo = () => {
    const title = (newTitle || "").trim();
    if (!title) return;

    const lastId =
      todosRaw.length > 0 ? Math.max(...todosRaw.map((todo) => todo.id)) : 0;

    const newTodo = {
      id: lastId + 1,
      title,
      completed: false,
    };

    const updatedRaw = [...todosRaw, newTodo];
    setTodosRaw(updatedRaw);
    setNewTitle("");
    setShowModal(false);

    // move to last page so user sees the new item
    const filteredLength = (onlyWaiting ? updatedRaw.filter((t) => !t.completed) : updatedRaw).length;
    const newNumPages = Math.max(1, Math.ceil(filteredLength / itemPerPage));
    setCurPage(newNumPages);
  };

  return (
    <>
      {/* filter */}
      <Form>
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <Form.Check
              type="switch"
              id="custom-switch"
              checked={onlyWaiting}
              onChange={(e) => {
                setOnlyWaiting(e.target.checked);
                setCurPage(1); // reset to first page when filter changes
              }}
            />
            <span style={{ color: "gold" }}>Show only</span>&nbsp;
            <Button variant="warning">
              Waiting <i className="bi bi-clock-fill"></i>
            </Button>
          </div>

          <Form.Select
            className="w-25"
            value={itemPerPage}
            onChange={(e) => {
              setItemPerpage(Number(e.target.value));
              setCurPage(1);
            }}
          >
            <option value={5}>5 items per page</option>
            <option value={10}>10 items per page</option>
            <option value={50}>50 items per page</option>
            <option value={100}>100 items per page</option>
          </Form.Select>
        </div>
      </Form>

      {/* table */}
      <div className="p-3">
        <Table striped bordered hover>
          <thead>
            <tr className="table-dark">
              <th style={{ width: "3rem" }}>ID</th>
              <th>Title</th>
              <th className="text-end" style={{ width: "12rem" }}>
                Completed&nbsp;
                <Button onClick={() => setShowModal(true)}>+</Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => {
              return (
                <tr key={todo.id}>
                  <td className="text-center">
                    <h6>
                      <Badge bg="secondary">{todo.id}</Badge>
                    </h6>
                  </td>
                  <td className="text-start">{todo.title}</td>
                  <td className="text-end">
                    {todo.completed ? (
                      <Badge bg="success" className="fs-5">
                        done <i className="bi bi-check"></i>
                      </Badge>
                    ) : (
                      <Button
                        variant="warning"
                        onClick={() => toggleCompleted(todo.id)}
                      >
                        Waiting <i className="bi bi-clock-fill"></i>
                      </Button>
                    )}
                    &nbsp;
                    <Button
                      variant="danger"
                      onClick={() => deleteTodo(todo.id)}
                    >
                      <i className="bi bi-trash-fill"></i>
                    </Button>
                  </td>
                </tr>
              );
            })}
            {todos.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center text-muted">
                  No items
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {/* page control */}
      <div className="text-center" style={{ color: "gold" }}>
        <Button
          variant="outline-dark"
          style={{ color: "gold", borderColor: "gold" }}
          onClick={() => setCurPage(1)}
          disabled={curPage === 1}
        >
          First
        </Button>
        &nbsp;
        <Button
          variant="outline-dark"
          style={{ color: "gold", borderColor: "gold" }}
          onClick={() => curPage > 1 && setCurPage((p) => p - 1)}
          disabled={curPage === 1}
        >
          Previous
        </Button>
        &nbsp;
        <span>
          {curPage}&nbsp;/&nbsp;{numPages}&nbsp;
        </span>
        <Button
          variant="outline-dark"
          style={{ color: "gold", borderColor: "gold" }}
          onClick={() => curPage < numPages && setCurPage((p) => p + 1)}
          disabled={curPage === numPages}
        >
          Next
        </Button>
        &nbsp;
        <Button
          variant="outline-dark"
          style={{ color: "gold", borderColor: "gold" }}
          onClick={() => setCurPage(numPages)}
          disabled={curPage === numPages}
        >
          Last
        </Button>
      </div>

      {/* Modal เพิ่มรายการ */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Title:</Form.Label>
            <Form.Control
              type="text"
              placeholder=" todo title here..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={addTodo}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Todos;
