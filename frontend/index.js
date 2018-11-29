import '@vaadin/vaadin-text-field/vaadin-text-field';
import '@vaadin/vaadin-button/vaadin-button';
import client from './src/generated/connect-client.default';
import {greet} from './src/generated/GreeterService';

client.credentials = (options = {}) => {
  return {username: 'test_login', password: 'test_password'};
};

const greeting = document.getElementById("greeting");
const nameInput = document.getElementById("nameInput");
document.getElementById("greet").onclick = async () => {
  if (!nameInput.value) {
    greeting.textContent = "Enter a name first!";
  } else {
    greeting.textContent = await greet(nameInput.value);
  }
};
