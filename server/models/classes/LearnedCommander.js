class LearnedCommander {
  toString() {
    const additionalTacticsNames = this.additionalTactics.map(t => t.name);
    return `${this.commander.id} (${additionalTacticsNames.join(', ')})`;
  }
}

module.exports = LearnedCommander;
