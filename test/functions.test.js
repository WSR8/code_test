import functions  from '../src/functions';
import {async} from "regenerator-runtime"; 

var Task = {
        id: 0,
        priority: 3,
        name: `第0个任务`,
        Info: '无',
        location: '', 
    }

var Error_task = {
    ic: 1,
    pr: 3,
    na: 'c',
}

describe('handleAdd', () => {
    test('添加后任务列表长度增加1', () => {
        expect(functions.handleAdd()).toEqual(true);
      });
});

describe('handleDelete', () => {
    test('删除任务在任务列表内', () => {
        expect(functions.handleDelete(0)).toEqual(true);
      });
    test('删除任务不在任务列表内', () => {
        expect(functions.handleDelete(100)).toEqual(true);
      });
});

describe('sortPriority', () => {
    test('调用函数后按照优先级从小到大排列', () => {
        expect(functions.sortPriority()).toEqual(true);
      });
});

describe('handleChangeName', () => {
    test('输入中文任务名称', () => {
        expect(functions.handleChangeName("任务", 0)).toEqual(true);
      });
    test('输入英文任务名称', () => {
        expect(functions.handleChangeName("task", 0)).toEqual(true);
      });
      test('输入任务名称为空', () => {
        expect(functions.handleChangeName("", 0)).toEqual(false);
      });
});

describe('handleChangeLocation', () => {
    test('输入中文任务地点', () => {
        expect(functions.handleChangeName("图书馆", 0)).toEqual(true);
      });
    test('输入英文任务地点', () => {
        expect(functions.handleChangeName("library", 0)).toEqual(true);
      });
      test('输入任务地点为空', () => {
        expect(functions.handleChangeName("", 0)).toEqual(true);
      });
});

describe('logIn', () => {
    test('输入用户名为null', async () => {
        expect.assertions(1);
        const data = await functions.logIn(null, '123')
        expect(data).toBe('No such user');
      });
    test('输入用户名为空', async () => {
        expect.assertions(1);
        const data = await functions.logIn('', '123')
        expect(data).toBe('Lack of name');
      });
    test('输入密码为空', async () => {
        expect.assertions(1);
        const data = await functions.logIn('wsr', '')
        expect(data).toBe('No password');
    });
    test('输入用户名包含非英文数字的字符', async () => {
        expect.assertions(1);
        const data = await functions.logIn('wsr字符', '123')
        expect(data).toBe('ilegal user name');
    });
    test('输入密码错误时', async () => {
        expect.assertions(1);
        const data = await functions.logIn('wsr1', '1234')
        expect(data).toBe("Wrong password");
    })
    test('输入用户名和密码为正常格式时', async () => {
        expect.assertions(1);
        const data = await functions.logIn('wsr1', '123')
        expect(data).toContainEqual(Task);
    })
});

describe('uploadData', () => {
    let dict = {};
    let taskn = [];
    test('以错误格式向数据库传入数据', async () => {
        expect.assertions(1);
        const data = await functions.uploadData(dict)
        expect(data).toBe("Wrong format");
      });
    
    dict.name = '';
    dict.password = '';
    dict.task = taskn;
    test('用户名为空', async () => {
        expect.assertions(1);
        const data = await functions.uploadData(dict)
        expect(data).toBe("Lack of name");
    });

    dict.name = 'wsr1';
    test('密码错误', async () => {
        expect.assertions(1);
        const data = await functions.uploadData(dict)
        expect(data).toBe("password wrong");
    });

    dict.name = 'wsr1字符';
    test('用户名中含有非英文数字的字符', async () => {
        expect.assertions(1);
        const data = await functions.uploadData(dict)
        expect(data).toBe("ilegal user name");
    });

    dict.name = 'wsr2';
    dict.password = '123';
    taskn.push(Error_task);
    test('传入任务格式错误', async () => {
        expect.assertions(1);
        const data = await functions.uploadData(dict)
        expect(data).toBe("ilegal task format");
    });

    dict.name = 'wsr1';
    dict.password = '123';
    taskn.pop();
    taskn.push(Task);
    test('传入数据正确', async () => {
        expect.assertions(1);
        const data = await functions.uploadData(dict)
        expect(data).toBe("sucess");
    });
});

describe('dropOnTask', () => {
    test('拖拽后重新排列任务id', () => {
        expect(functions.dropOnTask(0, 1)).toEqual(true);
      });
});

describe('logOut', () => {
    test('登出后清空任务列表', () => {
        expect(functions.logOut()).toEqual(true);
      });
});