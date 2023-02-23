# inventory-emails
sending emails when stock is low
3 google sheets:
1: to input inventory, can have multiple entries for the same item (ex: 3 bottles FBS, 5 bottles FBS)
2: to tally totals of each item (ex: 8 bottles FBS, only one entry per item; added using previous google sheet)
   (note: cannot edit where info is in each cell, but I think that would be easy to fix)
3: list of people to send emails to, can be added to send to more people

trigger runs program once a week
if items are below a threshold unique to each item (info can be found in sheet 2)
sends email for each item to order more and includes how much of each item we have
TO FIX: if multiple items need to be restocked, sends multiple emails; want to condense information into one email with all items needing to be bought
