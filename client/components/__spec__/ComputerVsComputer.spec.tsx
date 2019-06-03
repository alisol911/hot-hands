import * as React from 'react';
import { mount } from 'enzyme';
import waitUntil from 'async-wait-until';
import ComputerVsComputer from '../ComputerVsComputer';

describe('ComputerVsComputer Component', () => {
  const fetchAny = fetch as any;

  beforeEach(() => {
    fetchAny.resetMocks();

  });

  it('should create with the default classes', async (done) => {
    fetchAny.mockResponses(
      [
        JSON.stringify({ result: 'Paper' }),
        { status: 200 }
      ],
      [
        JSON.stringify({ result: 'Rock' }),
        { status: 200 }
      ],
      [
        JSON.stringify({ result: 'Player2' }),
        { status: 200 }
      ]
    );

    const g = mount(<ComputerVsComputer testMode={true}/>);
    await waitUntil(() => fetchAny.mock.calls.length > 2);
    expect(fetchAny.mock.calls.length).toEqual(3);
    expect(fetchAny.mock.calls[0][0]).toEqual('/api/throw');
    expect(fetchAny.mock.calls[1][0]).toEqual('/api/throw');
    expect(fetchAny.mock.calls[2][0]).toEqual('/api/judge');
    await waitUntil(() => g.state('winner') === 'Player2');
    g.update();
    expect(g.find('#game-result').text()).toEqual('Computer2 WIN!');
    done();
  });
});
