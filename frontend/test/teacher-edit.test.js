import {Selector} from 'testcafe';
process.env.NODE_ENV = "test";

fixture`Testing Teacher UI`
    .page`http://localhost:4401/`
    test('Testing edit teachers', async t => {
        await t.navigateTo("/");
        await t.click("#teacher-edit-10003");
    
        await t.typeText("#teacher-name", "Changed");
        await t.typeText("#teacher-age", "99");
        await t.click("#teacher-edit");
    
        await t.navigateTo("/");
    
        const table = Selector('#teacher-table');
        const rowCount = await table.find('tr').count;
    
        let tdText = await table.find('tr').nth(rowCount - 1).innerText;
    
        // Adding a while loop to wait for the updated text to be present in the table
        let textFound = false;
        let attempts = 5; // Adjust the number of attempts as needed
        while (!textFound && attempts > 0) {
            tdText = await table.find('tr').nth(rowCount - 1).innerText;
            if (tdText.includes("Changed")) {
                textFound = true;
            } else {
                await t.wait(1000); // Wait for 1 second before checking again
                attempts--;
            }
        }
    
        await t.expect(textFound).ok('The updated text was not found in the table');
    
        await t.click("#teacher-delete-10003");
    });