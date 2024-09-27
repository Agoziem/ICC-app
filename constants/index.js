/**
 * @type {WAMessage}
 */
export const WAMessageDefault = {
  id: null, // Default to null, since it's optional
  message_id: "", // Default to an empty string
  contact: null, // Default to null for optional positive number
  message_type: "text", // Default to "text"
  body: "", // Default to an empty string for the text message body
  media_id: "", // Default to an empty string for the media message ID
  mime_type: "", // Default to an empty string for MIME type
  filename: "", // Default to an empty string for filename
  animated: false, // Default to false for stickers
  caption: "", // Default to an empty string for media caption
  timestamp: new Date().toISOString(), // Default to the current timestamp
  message_mode: "received", // Default to "received"
  seen: false, // Default to false for seen status
  link: "https://www.example.com", // Default to an empty string for media link
  status: "pending", // Default to "pending" for message status
};
