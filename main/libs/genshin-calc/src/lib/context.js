import { resetCurrentEnemy, setCurrentEnemy } from './enemy.js';
import { resetCurrentTeam, setCurrentTeam } from './team.js';

export const withContext = ({ enemy, team, run }) => {
  if (enemy) {
    setCurrentEnemy(enemy);
  }
  if (team) {
    setCurrentTeam(team);
  }

  run();

  resetCurrentEnemy();
  resetCurrentTeam();
};
