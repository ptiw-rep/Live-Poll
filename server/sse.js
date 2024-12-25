const clients = new Set();

export function addClient(client) {
  clients.add(client);
}

export function removeClient(client) {
  clients.delete(client);
}

export function broadcast(data) {
  const message = JSON.stringify(data);
  clients.forEach(client => {
    client.write(`data: ${message}\n\n`);
  });
}