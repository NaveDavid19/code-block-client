import { Block } from './async-storage.service'
import { httpService } from './http.service'

const BASE_URL = '/codeBlock/'

const query = async (): Promise<Block[]> => {
  return httpService.get(BASE_URL)
}

const getById = async (codeBlockId: string): Promise<Block> => {
  return httpService.get(BASE_URL + codeBlockId)
}

const save = async (block: Block): Promise<Block> => {
  if (block._id) {
    return httpService.put(BASE_URL, block)
  } else {
    return httpService.post(BASE_URL, block)
  }
}

const emptyBlock: Block = {
  _id: '',
  initialTemplate: '',
  title: '',
  value: '',
  visitorCounter: 0,
  solution: '',
}

export const blockService = {
  query,
  getById,
  save,
  emptyBlock,
}
