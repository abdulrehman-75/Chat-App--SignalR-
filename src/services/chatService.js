export class ChatService {
  constructor(connection) {
    this.connection = connection;
  }

  async joinRoom(username, chatRoom) {
    if (!this.connection) {
      throw new Error('No connection available');
    }

    await this.connection.invoke('JoinSpecificChatRoom', {
      username,
      chatRoom
    });
  }

  async sendMessage(message, chatRoomName) {
    if (!this.connection || !chatRoomName) {
      throw new Error('No connection available');
    }

    await this.connection.invoke('SendMessage', message, chatRoomName);
  }
}