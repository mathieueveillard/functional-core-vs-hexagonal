type Counter = {
  id: string;
  value: number;
};

namespace HexagonalArchitecture {
  // Domain
  type Dependencies = {
    fetchCounter: (id: string) => Promise<Counter>;
    upsertCounter: (id: string, counter: Counter) => Promise<void>;
  };

  const incrementCounter =
    ({ fetchCounter, upsertCounter }: Dependencies) =>
    async (id: string): Promise<void> => {
      const counter = await fetchCounter(id);

      const updatedCounter: Counter = {
        ...counter,
        value: counter.value + 1,
      };

      await upsertCounter(counter.id, updatedCounter);
    };

  // API
  const api = {
    increment: async (id: string): Promise<void> => {
      await incrementCounter({ fetchCounter, upsertCounter })(id);
    },
  };
}

namespace FunctionalCoreImperativeShell {
  type Reducer<State> = (state: State) => State;

  // Domain
  const incrementCounter: Reducer<Counter> = (counter: Counter) => ({
    ...counter,
    value: counter.value + 1,
  });

  // API
  const api = {
    increment: async (id: string): Promise<void> => {
      const counter = await fetchCounter(id);
      const updatedCounter = incrementCounter(counter);
      await upsertCounter(counter.id, updatedCounter);
    },
  };
}

// Dummies and stubs
const counter: Counter = {
  id: "5d7ad519-dd8a-45a8-9b45-d936de41a9ed",
  value: 0,
};

const fetchCounter = (_id: string) => Promise.resolve(counter);

const upsertCounter = (_id: string, _counter: Counter) => Promise.resolve();
