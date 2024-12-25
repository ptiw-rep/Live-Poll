import { API_CONFIG } from './config';

async function retryFetch(fn: () => Promise<any>, retries = API_CONFIG.RETRY_ATTEMPTS): Promise<any> {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0) {
      await new Promise(resolve => setTimeout(resolve, API_CONFIG.RETRY_DELAY));
      return retryFetch(fn, retries - 1);
    }
    throw error;
  }
}

export async function fetchPolls() {
  return retryFetch(async () => {
    const response = await fetch(`${API_CONFIG.BASE_URL}/polls`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  });
}

export async function createPoll(question: string, options: string[]) {
  return retryFetch(async () => {
    const response = await fetch(`${API_CONFIG.BASE_URL}/polls`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question, options }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  });
}

export async function votePoll(optionId: number) {
  return retryFetch(async () => {
    const response = await fetch(`${API_CONFIG.BASE_URL}/vote/${optionId}`, {
      method: 'POST',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  });
}

export function createEventSource() {
  return new EventSource(`${API_CONFIG.BASE_URL}/events`);
}