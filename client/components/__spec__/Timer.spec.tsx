import * as React from 'react';
import { shallow } from 'enzyme';

import Timer from '../Timer';

describe('Timer Component', () => {

  it('should create with the default classes', async (done) => {
    const finished = jest.fn().mockImplementation(() => Promise.resolve());
    const initialTime = 2;
    const timer = shallow(<Timer initialTime={initialTime} finished={finished} />);
    const instance = timer.instance() as Timer;
    const date = new Date();
    instance.initialize();
    await finished();
    expect(finished).toHaveBeenCalled();
    expect(new Date().getTime() - date.getTime()).toBeGreaterThanOrEqual(initialTime);
    done();
  });
});
