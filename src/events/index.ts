export enum EventType {
  newNotification = 'newNotification',
}

export const on = (eventType: EventType, listener) => {
  document.addEventListener(eventType, listener)
}

export const off = (eventType: EventType, listener) => {
  document.removeEventListener(eventType, listener)
}

export const once = (eventType: EventType, listener) => {
  on(eventType, handleEventOnce)

  function handleEventOnce(event) {
    listener(event)
    off(eventType, handleEventOnce)
  }
}

export const trigger = (eventType: EventType, data) => {
  const event = new CustomEvent(eventType, { detail: data })
  document.dispatchEvent(event)
}
