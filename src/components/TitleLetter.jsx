export default function TitleLetter({ text }) {
  if (text) {
    return text.charAt(0).toUpperCase() + text.substring(1).toLowerCase();
  }
}
