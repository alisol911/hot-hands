import * as React from 'react';
import { shallow, render, configure } from 'enzyme';

import Hand from '../Hand';

describe('Hand Component', () => {
  const fetchAny = fetch as any;

  beforeEach(() => {
    fetchAny.resetMocks();
  });

  it('should create with the default classes', () => {
    let handType = { result: ['Rock', 'Paper', 'Scissors'] };
    fetchAny.mockResponses(
      [
        JSON.stringify(handType),
        { status: 200 }
      ],
      [
        JSON.stringify({ result: 'Paper' }),
        { status: 200 }
      ]
    );

    const hand = shallow(<Hand />);

    expect(fetchAny.mock.calls.length).toEqual(2);
    expect(fetchAny.mock.calls[0][0]).toEqual('/api/hands');
    expect(fetchAny.mock.calls[1][0]).toEqual('/api/throw');

    // jest does not call render automatically
    hand.setState({ list: handType.result }, () => {
      hand.update();
      const handList = hand.children('#hand-list').children();
      expect(handList.length).toEqual(3);
      handList.first().simulate('click');
      expect(fetchAny.mock.calls.length).toEqual(3);
      expect(fetchAny.mock.calls[2][0]).toEqual('/api/judge');
    });
  });
});
