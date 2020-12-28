import { v4 } from "uuid";

export type MockDataType = "rua";

export interface MockData {
  rua?: {
    mocked: boolean;
    quantity: number;
    template?: any;
  };
}

export type SubscribeFunction = (mockData: MockData) => void;

export class MockDataController {
  subscribers: Record<string, SubscribeFunction>;
  mockData: MockData;

  constructor() {
    this.subscribers = {};
    this.mockData = {};
  }

  subscribe(fn: SubscribeFunction) {
    const id = v4();
    this.subscribers[id] = fn;
    return id;
  }

  unsubscribe(token: string) {
    delete this.subscribers[token];
  }

  updateMockData(newMockData: MockData) {
    this.mockData = newMockData;
    this.notifySubscribers();
  }

  private notifySubscribers() {
    Object.values(this.subscribers).forEach((thisSubscriber) => {
      thisSubscriber(this.mockData);
    });
  }
}

export const mockDataController = new MockDataController();
