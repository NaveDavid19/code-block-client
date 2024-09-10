import { Block, storageService } from './async-storage.service'
import { utilService } from './util.service'

const BLOCK_KEY = 'blockDB'

const getBlocks = async () => {
  return storageService.query(BLOCK_KEY)
}

const getById = (blockId: string) => {
  return storageService.get(BLOCK_KEY, blockId)
}

const save = async (block: Block): Promise<Block> => {
  if (block._id) {
    return storageService.put(BLOCK_KEY, block)
  } else {
    return storageService.post(BLOCK_KEY, block)
  }
}

const _createBlocks = (): void => {
  let blocks = utilService.loadFromStorage(BLOCK_KEY)
  if (!blocks || !blocks.length) {
    blocks = [
      {
        _id: 't101',
        title: 'User Authentication Flow',
        initialTemplate: `function authenticateUser(username, password) {
          // TODO: Fix the condition to check for valid credentials
          if (username === 'admin' && password === 'password123') {
            return true;
          }
          // Missing: Correct failure condition
          return false;
        }`,
        isVisited: false,
      },
      {
        _id: 't102',
        title: 'Data Fetching with Axios',
        initialTemplate: `function fetchData() {
        // TODO: Simulate data fetching and handle response
        const data = null; // Simulate fetching with empty or incorrect data
        if (data) {
          console.log('Data fetched:', data);
        } else {
          // Missing: Correct error handling
          console.error('Failed to fetch data');
        }
      }`,
        isVisited: false,
      },
      {
        _id: 't103',
        title: 'Responsive Design with Flexbox',
        initialTemplate: `/* Responsive Design with Flexbox */
      .container {
        display: flex;
        /* TODO: Add missing flex properties for alignment */
      }
      
      .item {
        flex: 1;
        /* Missing: Adjustments for better layout */
      }`,
        isVisited: false,
      },
      {
        _id: 't104',
        title: 'Error Boundary in React',
        initialTemplate: `function renderComponent(hasError) {
        // TODO: Complete error handling logic
        if (hasError) {
          // Missing: Proper error message or handling
          return 'Error: Component failed to render';
        }
        return 'Component rendered successfully';
      }`,
        isVisited: false,
      },
      {
        _id: 't105',
        title: 'Data Validation Example',
        initialTemplate: `function validateInput(input) {
            // TODO: Fix the validation logic
            if (input.trim().length > 0) {
              return true;
            }
            // Missing: Correct validation failure condition
            return false;
          }`,
        isVisited: false,
      },
      {
        _id: 't106',
        title: 'Sorting Algorithm Example',
        initialTemplate: `function sortArray(arr) {
            // TODO: Implement the sorting algorithm
            return arr.sort((a, b) => a - b);
          }`,
        isVisited: false,
      },
      {
        _id: 't107',
        title: 'Event Handling Example',
        initialTemplate: `function handleClick() {
      // TODO: Implement the click handler
      alert('Button clicked!');
    } `,
        isVisited: false,
      },
      {
        _id: 't108',
        title: 'Form Validation Example',
        initialTemplate: `
    function validateForm(form) {
      // TODO: Implement form validation
      if (form.email && form.password) {
        return true;
      }
      // Missing: Correct form validation failure condition
      return false;
    }`,
        isVisited: false,
      },
      {
        _id: 't109',
        title: 'Fetch Data Example',
        initialTemplate: `
    async function fetchData(url) {
      // TODO: Handle the fetch request and response
      const response = await fetch(url);
      const data = await response.json();
      console.log('Data:', data);
    }`,
        isVisited: false,
      },
    ]
  }
  utilService.saveToStorage(BLOCK_KEY, blocks)
}
_createBlocks()

export const blockService = {
  getBlocks,
  getById,
  save,
}
