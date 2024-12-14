import { defineStore } from 'pinia';
import { levelList } from '../data/levelList';
export const useSkillStore = defineStore('skills', {
  state: () => ({
    skills: {
        战斗等级:{level: 1},
        攻击: { level: 1, exp: 0 },
        力量: { level: 1, exp: 0 },
        防御: { level: 1, exp: 0 },
        生命值: { level: 10, exp: 0 },
        远程: { level: 1, exp: 0 },
        魔法: { level: 1, exp: 0 },
        祝祭: { level: 1, exp: 0 },
        屠杀者: { level: 1, exp: 0 },
        // 被动技能
        种地: { level: 1, exp: 0, masteryPool: 0, masteryPoolMax: 19500000},
        城镇: { level: 1, exp: 0 },
  
        // 非战斗技能
        伐木: { level: 1, exp: 0, masteryPool: 0, masteryPoolMax: 10000000},
        钓鱼: { level: 1, exp: 0, masteryPool: 0, masteryPoolMax: 20000000},
        生火: { level: 1, exp: 0, masteryPool: 0, masteryPoolMax: 10000000},
        烹饪: { level: 1, exp: 0, masteryPool: 0, masteryPoolMax: 27000000},
        采矿: { level: 1, exp: 0, masteryPool: 0, masteryPoolMax: 11500000},
        锻造: { level: 1, exp: 0, masteryPool: 0, masteryPoolMax: 106000000},
        扒窃: { level: 1, exp: 0, masteryPool: 0, masteryPoolMax: 17000000},
        弓匠: { level: 1, exp: 0, masteryPool: 0, masteryPoolMax: 49500000},
        制造: { level: 1, exp: 0, masteryPool: 0, masteryPoolMax: 57000000},
        符文锻造: { level: 1, exp: 0, masteryPool: 0, masteryPoolMax: 69500000},
        草药学: { level: 1, exp: 0, masteryPool: 0, masteryPoolMax: 26000000},
        敏捷训练: { level: 1, exp: 0, masteryPool: 0, masteryPoolMax: 39500000},
        召唤: { level: 1, exp: 0, masteryPool: 0, masteryPoolMax: 14500000},
        天文学: { level: 1, exp: 0, masteryPool: 0, masteryPoolMax: 8000000},
        转换魔法: { level: 1, exp: 0},
    },
    activeSkill:'',
  }),
  getters:{
    calCombatLevel(){
        const defenseCombatLevel = 0.25 * (this.skills['防御'].level + this.skills['生命值'].level + 0.5 * this.skills['祝祭'].level)
        const meleeCombatLevel = 0.75 * (this.skills['攻击'].level + this.skills['力量'].level);
        const rangedCombatLevel = 1.5 * this.skills['远程'].level;
        const magicCombatLevel = 1.5 * this.skills['魔法'].level;
        const attackCombatLevel = magicCombatLevel + rangedCombatLevel + meleeCombatLevel;
        return Math.floor(defenseCombatLevel + 0.75 * attackCombatLevel);
    },
    getMaxExp() {
        return (level) => levelList[level];
      },
  },
  actions: {
    addExp(skillName, expToAdd) {
      let maxExp = this.getMaxExp(this.skills[skillName].level);
      let skill = this.skills[skillName] || console.error('the skillName is wrong:', skillName);
      skill.exp += expToAdd;
      //  console.log(`现在${skillName}技能的经验值为：${skill.exp}` )
      //  console.log(`现在${skillName}技能的经验值为：${this.skills[skillName].exp}` )
      while (skill.exp >= maxExp && skill.level < 99) {
        skill.level++;
        maxExp = this.getMaxExp(this.skills[skillName].level)
        //  console.log(`现在${skillName}技能等级为：${skill.level}` )
        //  console.log(`现在${skillName}技能最大经验值为：${maxExp}` )
      }
      this.skills[skillName] = skill;
    },
    getMasteryExp(masteryLevel,itemNumber,actionTime){
      const result = masteryLevel * itemNumber/10 * actionTime * 0.5;
      return result; 
    },
    addMasteryPoolExp(skillName, expToAdd) {
        const skill = this.skills[skillName] || console.error('the skillName is wrong:', skillName);
        skill.masteryPool += expToAdd;
        this.skills[skillName] = skill;
    },
    costMasteryPoolExp(skillName, expToCost) {
        const skill = this.skills[skillName] || console.error('the skillName is wrong:', skillName);
        while (skill.masteryPool >= expToCost) {
            skill.masteryPool -= expToCost;
        }
        this.skills[skillName] = skill;
    },
  },
});