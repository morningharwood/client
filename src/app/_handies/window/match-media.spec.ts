import {MatchMediaService} from './match-media';
import {MediaQueryHelper} from './media-query'

describe('MatchMediaClass',()=>{
  describe('bp', ()=> {
    it('should match medium', ()=> {
      console.log()
      expect(MatchMediaService.bp('normal')).toBe(true);
    });


  })
})
