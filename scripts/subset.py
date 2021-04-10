import pandas as pd

data = pd.read_csv('covid19Cases.csv')
data['date'] = pd.to_datetime(data['date'])
cutoff = pd.to_datetime('2021-01-01')
data[data['date']>=cutoff]
data[data['date']>=cutoff].to_csv('2021_subset.csv', index=None)
