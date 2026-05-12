import type { DatabaseManagerInstance, LoggerService, ManagerConfig } from '@tazama-lf/frms-coe-lib';
  import type { Case, RuleConfig, RuleRequest, RuleResult } from '@tazama-lf/frms-coe-lib/lib/interfaces';
import type { SupportedTransactionMessage } from '@tazama-lf/frms-coe-lib/lib/interfaces';
import type { BaseMessage } from '@tazama-lf/frms-coe-lib/lib/interfaces';

export type RuleExecutorConfig = Required<Pick<ManagerConfig, 'rawHistory' | 'eventHistory' | 'configuration' | 'localCacheConfig'>>;

export const exclusiveDetermineOutcome = (value: string, caseObj: Case): number => {
  const ruleResult = caseObj.expressions.find((expression) => expression?.value === value); 
 return ruleResult ?? caseObj.alternative;
};

export async function handleTransaction(
  req: RuleRequest<SupportedTransactionMessage>,
  determineOutcome: (value: number, ruleConfig: RuleConfig, ruleResult: RuleResult) => RuleResult,
  ruleRes: RuleResult,
  loggerService: LoggerService,
  ruleConfig: RuleConfig,
  databaseManager: DatabaseManagerInstance<RuleExecutorConfig>,
): Promise<RuleResult> {
  const transaction = req.transaction as BaseMessage;
  
const country = transaction.Payload.country as unknown as string;

  return exclusiveDetermineOutcome(country, ruleConfig.config.cases);
  
}