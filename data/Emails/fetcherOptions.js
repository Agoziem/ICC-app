/**
 * add Message Responses Configuration 
 *
 * @param {EmailResponse} newResponse
 */
export const addMessageResponseOptions = (newResponse) => {
  return {
    
    /** @param {EmailResponseArray} responses */
    optimisticData: (responses) =>
      [...responses, newResponse].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()),

    rollbackOnError: true,
    /**
     * @param {EmailResponseArray} responses
     * @param {EmailResponse} addedResponse
     */
    populateCache: (addedResponse, responses) =>
      [...responses, addedResponse].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()),
    revalidate: false,
  };
};
