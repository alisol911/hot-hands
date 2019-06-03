import * as React from 'react';
import { mount } from 'enzyme';
import waitUntil from 'async-wait-until';
import ComputerVsPlayer from '../ComputerVsPlayer';

describe('ComputerVsPlayer Component', () => {
  const fetchAny = fetch as any;

  beforeEach(() => {
    fetchAny.resetMocks();
  });

  it('should create with the default classes', async (done) => {
    let handType = { result: ['Rock', 'Paper', 'Scissors'] };
    fetchAny.mockResponses(
      [
        JSON.stringify(handType),
        { status: 200 }
      ],
      [
        JSON.stringify({ result: 'Paper' }),
        { status: 200 }
      ],
      [
        JSON.stringify({ result: 'Player1' }),
        { status: 200 }
      ]
    );

    const g = mount(<ComputerVsPlayer testMode={true}/>);

    expect(fetchAny.mock.calls.length).toEqual(2);
    expect(fetchAny.mock.calls[0][0]).toEqual('/api/hands');
    expect(fetchAny.mock.calls[1][0]).toEqual('/api/throw');
    await waitUntil(() => (g.state('list') as any).length === handType.result.length);
    g.update();
    const handList = g.find('#hand-list');
    expect(handList.children().length).toEqual(handType.result.length);
    handList.children().first().simulate('click');
    expect(fetchAny.mock.calls.length).toEqual(3);
    expect(fetchAny.mock.calls[2][0]).toEqual('/api/judge');
    await waitUntil(() => g.state('winner') === 'Player1');
    g.update();
    expect(g.find('#game-result').text()).toEqual('YOU LOSE!');
    done();
  });
});
