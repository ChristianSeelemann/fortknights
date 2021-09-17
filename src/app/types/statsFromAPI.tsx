export default interface statsFromAPI {
  data: {
    result: boolean;
    name: string;
    account: {
      level: number | null;
      progress_pct: number | null;
    };
    global_stats: {
      squad: {
        placetop1: number;
        kd: number;
        winrate: number;
        placetop3: number;
        placetop5: number;
        placetop6: number;
        placetop10: number;
        placetop12: number;
        placetop25: number;
        kills: number;
        matchesplayed: number;
        minutesplayed: number;
        score: number;
        playersoutlived: number;
      };
      duo: {
        placetop1: number;
        kd: number;
        winrate: number;
        placetop3: number;
        placetop5: number;
        placetop6: number;
        placetop10: number;
        placetop12: number;
        placetop25: number;
        kills: number;
        matchesplayed: number;
        minutesplayed: number;
        score: number;
        playersoutlived: number;
      };
      solo: {
        placetop1: number;
        kd: number;
        winrate: number;
        placetop3: number;
        placetop5: number;
        placetop6: number;
        placetop10: number;
        placetop12: number;
        placetop25: number;
        kills: number;
        matchesplayed: number;
        minutesplayed: number;
        score: number;
        playersoutlived: number;
      };
    };
  };
  id: string;
}
