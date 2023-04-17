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

ALSO:
added ** to formulas in google sheets so they only need to CONTAIN the phrase (extra leading/trailing spaces no longer an sisue)
STILL have to have exact phrase entered for each item in inventory lists for summary to work
=SUMIF('Flow Inventory'!A:A, "*Nucleic Acid Dye A*", 'Flow Inventory'!G:G)
(for vials of cells also includes check for enthalpy lot # == NA bc only want to count cells directly from supplier)
=SUMIFS('LNT-02 Inventory'!G:G,'LNT-02 Inventory'!F:F,"*NA*",'LNT-02 Inventory'!A:A,"*A549*")
