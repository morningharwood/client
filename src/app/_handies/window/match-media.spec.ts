import {MatchMediaService} from './match-media';
import {MediaQueryHelper} from './media-query'

describe('MatchMediaClass',()=>{
  describe('bp', ()=> {
    it('should match medium', ()=> {
      expect(MatchMediaService.bp('small')).toBe(true);
    });


  })
})
