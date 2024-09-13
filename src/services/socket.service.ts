import { io, Socket } from 'socket.io-client' // Correctly import Socket from socket.io-client

// Define your socket events
export const SOCKET_EVENT_STUDENT_JOIN = 'student-join'
export const SOCKET_EVENT_STUDENT_LEFT = 'student-left'
export const SOCKET_EVENT_MENTOR_JOIN = 'mentor-join'
export const SOCKET_EVENT_MENTOR_LEFT = 'mentor-left'
export const SOCKET_EVENT_CODE_EDIT = 'code-changed'

const baseUrl =
  process.env.NODE_ENV === 'production' ? undefined : '//localhost:3030'

export let socket: Socket | undefined

if (baseUrl) {
  socket = io(baseUrl)
}
