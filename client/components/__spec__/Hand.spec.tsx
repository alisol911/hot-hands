import * as React from 'react';
import { shallow, render, mount, configure } from 'enzyme';
import waitUntil from 'async-wait-until';
import Hand from '../Hand';

describe('Hand Component', () => {
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

    const hand = mount(<Hand />);

    expect(fetchAny.mock.calls.length).toEqual(2);
    expect(fetchAny.mock.calls[0][0]).toEqual('/api/hands');
    expect(fetchAny.mock.calls[1][0]).toEqual('/api/throw');
    await waitUntil(() => (hand.state('list') as any).length === handType.result.length);
    hand.update();
    const handList = hand.find('#hand-list');
    expect(handList.children().length).toEqual(handType.result.length);
    handList.children().first().simulate('click');
    expect(fetchAny.mock.calls.length).toEqual(3);
    expect(fetchAny.mock.calls[2][0]).toEqual('/api/judge');
    await waitUntil(() => hand.state('winner') === 'Player1');
    hand.update();
    expect(hand.find('#game-result').text()).toEqual('YOU LOSE!');
    done();
  });
});
