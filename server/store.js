// In-memory data store
export const store = {
  polls: [],
  nextId: 1,
  nextOptionId: 1
};

export function createPoll(question, options) {
  const poll = {
    id: store.nextId++,
    question,
    options: options.map(text => ({
      id: store.nextOptionId++,
      text,
      votes: 0
    }))
  };
  
  store.polls.push(poll);
  return poll;
}

export function vote(optionId) {
  for (const poll of store.polls) {
    const option = poll.options.find(opt => opt.id === optionId);
    if (option) {
      option.votes++;
      return true;
    }
  }
  return false;
}

export function getPolls() {
  return store.polls;
}