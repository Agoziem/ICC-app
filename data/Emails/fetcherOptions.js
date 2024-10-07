/**
 * add Message Responses Configuration
 * @param {EmailResponse} newResponse
 */
export const addMessageResponseOptions = (newResponse) => {
  return {
    /** @param {EmailResponseArray} responses */
    optimisticData: (responses) =>
      [...responses, newResponse].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      ),

    rollbackOnError: true,
    /**
     * @param {EmailResponseArray} responses
     * @param {EmailResponse} addedResponse
     */
    populateCache: (addedResponse, responses) =>
      [...responses, addedResponse].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      ),
    revalidate: false,
  };
};

/**
 * add Email Message Configuration
 * @param {EmailMessage} newSentEmail
 */
export const createEmailOptions = (newSentEmail) => {
  return {
    /** @param {EmailMessageArray} sentemails */
    optimisticData: (sentemails) => {
      const updatedSentEmails = sentemails ? [...sentemails] : [];
      return [...updatedSentEmails, newSentEmail].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    },

    rollbackOnError: true,

    /**
     * @param {EmailMessageArray} responses
     * @param {EmailMessage} addedResponse
     */
    populateCache: (addedResponse, responses) => {
      const updatedResponses = responses ? [...responses] : [];
      // Add the new response and sort by `created_at`
      return [...updatedResponses, addedResponse].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    },

    revalidate: false,
  };
};
