// @flow

/*::
type Assertion = {
  description: string,
  validatesExpectation: boolean,
};

type Expectation = {
  description: string,
  test: () => Promise<Array<Assertion>>,
};
*/

const createAssertion = (
  description/*: string*/,
  validatesExpectation/*: boolean*/,
)/*: Assertion*/ => ({
  description,
  validatesExpectation,
});

const createExpectation = (
  description/*: string*/,
  test/*: () => Promise<Array<Assertion>>*/,
)/*: Expectation*/ => ({
  description,
  test,
});

const createVideoStatus = (id, progress) => ({
  id,
  progress,
});

const createApi = (statuses) => {
  const getVideoStatus = (requestId) => {
    return statuses.find(status => status.id === requestId);
  };
  return {
    getVideoStatus,
  };
};

const createClient = (api) => {
  const getVideoStatus = (requestId) => new Promise((resolve, reject) => {
    const status = api.getVideoStatus(requestId);
    if (!status) {
      return reject(new Error('RRRAWWWRR!!'));
    }
    return resolve(status);
  });

  return {
    getVideoStatus,
  };
};

const expectProgressToEqual = (a, b) => createAssertion('progress are to be equals', a.progress === b.progress);
const expectIdToEqual = (a, b) => createAssertion('id are to be equals', a.id === b.id);

const clientResovlesWithStatus = createExpectation('getVideoStatus() to give a Video Status from the specified episode', async () => {
  const apiVideoStatus = createVideoStatus('123', '10000');
  const api = createApi([apiVideoStatus]);
  const client = createClient(api);

  const videoStatus = await client.getVideoStatus(apiVideoStatus.id);

  return [
    expectProgressToEqual(videoStatus, apiVideoStatus),
    expectIdToEqual(videoStatus, apiVideoStatus),
  ];
});

const clientThrowsWhenMissing = createExpectation('getVideoStatus() to throw an error if the episode does not exist', async () => {
  const apiVideoStatus = createVideoStatus('123', '10000');
  const api = createApi([apiVideoStatus]);
  const client = createClient(api);

  const error = await new Promise(res => client.getVideoStatus('a-fake-id').catch(res));

  return [
    createAssertion('error is to exist', !!error),
  ];
});

const main = async () => {
  console.log(clientResovlesWithStatus.description, await clientResovlesWithStatus.test());
  console.log(clientThrowsWhenMissing.description, await clientThrowsWhenMissing.test());
};

main();