import mut from './module.js';
//sum test cases
test('Testing sum -- success', () => {
    const expected = 30;
    const got = mut.sum(12,18);
    expect(got).toBe(expected);
});

test('Testing sum -- success', () => {
    const expected = 6;
    const got = mut.sum(-12,18);
    expect(got).toBe(expected);
});

test('Testing sum -- success', () => {
    const expected = -6;
    const got = mut.sum(12,-18);
    expect(got).toBe(expected);
});

test('Testing sum -- success', () => {
    const expected = -6;
    const got = mut.sum(12,-18);
    expect(got).toBe(expected);
});

test('Testing sum -- success', () => {
    const expected = 0;
    const got = mut.sum(0,0);
    expect(got).toBe(expected);
});

test('Testing sum -- success', () => {
    const expected = -6;
    const got = mut.sum(-4,-2);
    expect(got).toBe(expected);
});

//Div Tests
test('Testing div -- success', () => {
    const expected = 2;
    const got = mut.div(10,5);
    expect(got).toBe(expected);
});

test('Testing div -- success', () => {
    const expected = 2.5;
    const got = mut.div(10,4);
    expect(got).toBe(expected);
});

test('Testing div -- success', () => {
    const expected = -2;
    const got = mut.div(-10,5);
    expect(got).toBe(expected);
});

test('Testing div -- success', () => {
    const expected = -2;
    const got = mut.div(10,-5);
    expect(got).toBe(expected);
});

test('Testing div -- success', () => {
    const expected = 10 / 3;
    const got = mut.div(10,3);
    expect(got).toBe(expected);
});

test('Testing div -- success', () => {
    const expected = 0.5;
    const got = mut.div(5,10);
    expect(got).toBe(expected);
});

//containsNumber tests
test('Testing containsNumber -- False', () => {
    const got = mut.containsNumbers("!@#$%^&*()_+-=[]{}|:;'|\0,.<>/?~");
    expect(got).toBeFalsy();
});

test('Testing containsNumber -- Truth', () => {
    const got = mut.containsNumbers("abc123");
    expect(got).toBeTruthy();
});

test('Testing containsNumber -- Truth', () => {
    const got = mut.containsNumbers("123abc");
    expect(got).toBeTruthy();
});

test('Testing containsNumber -- False', () => {
    const got = mut.containsNumbers("!@#$%^&*()_+-=[]{}|:;'|\0,.<>/?~");
    expect(got).toBeFalsy();
});

test('Testing containsNumber -- False', () => {
    const got = mut.containsNumbers("The_quick_brown_fox_jumps_over_the_lazy_dog.");
    expect(got).toBeFalsy();
});

//The bug: no number, but space counted as number
test('Testing containsNumber -- Should be False: Is Truth', () => {
    const got = mut.containsNumbers(" ");
    expect(got).toBeTruthy();
});