class LearnedCommander {
  get humanize() {
    const additionalTacticsNames = this.additionalTactics.map(
      t => (t != null ? t.name : '未習得')
    );
    return `${this.commander.id} (${additionalTacticsNames.join(', ')})`;
  }
}

module.exports = LearnedCommander;
