// @flow

const expect = (expectedAssertion, getChildExpectations) => {
  const test = async () => {
    const childExpectations = await getChildExpectations();
    const childAssertions = await Promise.all(childExpectations.map(ex => ex.test()));

    const isValid = childAssertions.every(assertion => assertion.isValid);

    return {
      actualAssertion: isValid ? expectedAssertion : childAssertions.find(assertion => !assertion.isValid).actualAssertion,
      isValid,
    };
  };

  return {
    test,
  };
};

const expectTrue = (expectedAssertion, testExpectation) => {
  const test = () => {
    const isValid = testExpectation();
    return {
      actualAssertion: expectedAssertion,
      isValid,
    };
  };

  return {
    test,
  }
};

const expectToReject = (functionToReject) => {
  const test = async () => {
    try {
      await functionToReject();
      return {
        actualAssertion: 'Didnt Reject',
        isValid: false,
      };
    } catch (error) {
      return {
        actualAssertion: 'Rejected',
        isValid: true,
      };
    }
  };

  return {
    test,
  };
};

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
  const getVideoStatus = async (requestId) => {
    const status = api.getVideoStatus(requestId);
    if (!status) {
      throw new Error('WRAARR!');
    }
    return status;
  };

  return {
    getVideoStatus,
  };
};

const expectProgressToEqual = (a, b) => expectTrue('progress to equal', () => (
  a.progress === b.progress
));
const expectIdToEqual = (a, b) => expectTrue('episodeId to equal', () => (
  a.id === b.id
));

const userApiClientTest = expect('User API Client to connect with a User API instance', () => {
  const apiVideoStatus = createVideoStatus('123', '10000');
  const api = createApi([apiVideoStatus]);

  return [
    expect('getVideoStatus() to give a Video Status from the specified episode', async () => {
      const client = createClient(api);

      const videoStatus = await client.getVideoStatus(apiVideoStatus.id);

      return [
        expectProgressToEqual(videoStatus, apiVideoStatus),
        expectIdToEqual(videoStatus, apiVideoStatus),
      ];
    }),
    expect('getVideoStatus() to throw if the specified ID isnt in the api', async () => {
      const client = createClient(api);

      return [
        expectToReject(() => client.getVideoStatus('a-fake-id')),
      ];
    }),
  ];
});

const main = async () => {
  console.log(await userApiClientTest.test());
};

main();